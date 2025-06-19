import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] });
        
        if (!user) {
            user = new User({
                method: 'google',
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                isVerified: true
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = profile.id;
            user.method = 'google';
            await user.save();
        }
        
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        let user = await User.findOne({ $or: [{ githubId: profile.id }, { email }] });
        
        if (!user) {
            user = new User({
                method: 'github',
                githubId: profile.id,
                email,
                firstName: profile.displayName?.split(' ')[0] || 'GitHub',
                lastName: profile.displayName?.split(' ')[1] || 'User',
                isVerified: true
            });
            await user.save();
        } else if (!user.githubId) {
            user.githubId = profile.id;
            user.method = 'github';
            await user.save();
        }
        
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});