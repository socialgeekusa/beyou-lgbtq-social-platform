#!/usr/bin/env node

/**
 * 🌈 BeYou App Assets Generator
 * Generates all required icons and assets for iOS and Android app stores
 */

const fs = require('fs');
const path = require('path');

// App Store Asset Requirements
const APP_ASSETS = {
  ios: {
    icons: [
      { size: 1024, name: 'AppIcon-1024.png', desc: 'App Store' },
      { size: 180, name: 'AppIcon-180.png', desc: 'iPhone' },
      { size: 167, name: 'AppIcon-167.png', desc: 'iPad Pro' },
      { size: 152, name: 'AppIcon-152.png', desc: 'iPad' },
      { size: 120, name: 'AppIcon-120.png', desc: 'iPhone' },
      { size: 87, name: 'AppIcon-87.png', desc: 'iPhone' },
      { size: 80, name: 'AppIcon-80.png', desc: 'iPad' },
      { size: 76, name: 'AppIcon-76.png', desc: 'iPad' },
      { size: 60, name: 'AppIcon-60.png', desc: 'iPhone' },
      { size: 58, name: 'AppIcon-58.png', desc: 'iPhone' },
      { size: 40, name: 'AppIcon-40.png', desc: 'iPad' },
      { size: 29, name: 'AppIcon-29.png', desc: 'iPhone/iPad' },
      { size: 20, name: 'AppIcon-20.png', desc: 'iPad' }
    ],
    launchScreens: [
      { width: 1290, height: 2796, name: 'LaunchScreen-iPhone14ProMax.png' },
      { width: 1179, height: 2556, name: 'LaunchScreen-iPhone14Pro.png' },
      { width: 1170, height: 2532, name: 'LaunchScreen-iPhone13.png' },
      { width: 1125, height: 2436, name: 'LaunchScreen-iPhone12mini.png' },
      { width: 828, height: 1792, name: 'LaunchScreen-iPhone11.png' }
    ]
  },
  android: {
    icons: [
      { size: 512, name: 'ic_launcher-512.png', desc: 'Play Store' },
      { size: 192, name: 'ic_launcher-192.png', desc: 'xxxhdpi' },
      { size: 144, name: 'ic_launcher-144.png', desc: 'xxhdpi' },
      { size: 96, name: 'ic_launcher-96.png', desc: 'xhdpi' },
      { size: 72, name: 'ic_launcher-72.png', desc: 'hdpi' },
      { size: 48, name: 'ic_launcher-48.png', desc: 'mdpi' }
    ],
    featureGraphic: {
      width: 1024,
      height: 500,
      name: 'feature-graphic.png'
    }
  }
};

// BeYou Brand Colors (Pride Theme)
const BRAND_COLORS = {
  primary: '#732982',    // Pride Purple
  secondary: '#ff69b4',  // Pride Pink
  accent: '#0078d4',     // Pride Blue
  background: '#ffffff', // White
  text: '#0a0a0a'       // Black
};

// Create directories
function createDirectories() {
  const dirs = [
    'mobile-assets',
    'mobile-assets/ios',
    'mobile-assets/ios/icons',
    'mobile-assets/ios/launch-screens',
    'mobile-assets/android',
    'mobile-assets/android/icons',
    'public/icons'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Generate SVG icon template
function generateSVGIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="prideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${BRAND_COLORS.secondary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_COLORS.accent};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="url(#prideGradient)" />
  
  <!-- BeYou Text -->
  <text x="${size/2}" y="${size/2 + size/8}" 
        font-family="Arial, sans-serif" 
        font-size="${size/6}" 
        font-weight="bold" 
        text-anchor="middle" 
        fill="white">BeYou</text>
  
  <!-- Rainbow Heart -->
  <g transform="translate(${size/2}, ${size/2 - size/6})">
    <path d="M0,-8 C-4,-12 -12,-12 -12,-4 C-12,4 0,12 0,12 C0,12 12,4 12,-4 C12,-12 4,-12 0,-8 Z" 
          fill="white" 
          transform="scale(${size/200})" />
  </g>
</svg>`;
}

// Generate launch screen SVG
function generateLaunchScreenSVG(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${BRAND_COLORS.secondary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_COLORS.accent};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#backgroundGradient)" />
  
  <!-- Logo Circle -->
  <circle cx="${width/2}" cy="${height/2 - 100}" r="80" fill="white" fill-opacity="0.2" />
  <circle cx="${width/2}" cy="${height/2 - 100}" r="60" fill="white" />
  
  <!-- BeYou Text -->
  <text x="${width/2}" y="${height/2 - 80}" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        font-weight="bold" 
        text-anchor="middle" 
        fill="${BRAND_COLORS.primary}">BeYou</text>
  
  <!-- App Title -->
  <text x="${width/2}" y="${height/2 + 50}" 
        font-family="Arial, sans-serif" 
        font-size="32" 
        font-weight="bold" 
        text-anchor="middle" 
        fill="white">BeYou</text>
  
  <!-- Subtitle -->
  <text x="${width/2}" y="${height/2 + 90}" 
        font-family="Arial, sans-serif" 
        font-size="18" 
        text-anchor="middle" 
        fill="white" 
        fill-opacity="0.9">LGBTQ+ Social Platform</text>
  
  <!-- Loading indicator -->
  <circle cx="${width/2}" cy="${height/2 + 150}" r="3" fill="white" fill-opacity="0.8">
    <animate attributeName="fill-opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
  </circle>
</svg>`;
}

// Generate app store listing content
function generateAppStoreListing() {
  const listing = {
    name: "BeYou - LGBTQ+ Social",
    subtitle: "Safe Space for Authentic Expression",
    description: `BeYou is the premier social media platform designed specifically for the LGBTQ+ community. Share your authentic self through short videos, connect with like-minded individuals, and build meaningful relationships in a safe, inclusive environment.

🌈 KEY FEATURES:
• Create and share short videos (5-60 seconds)
• Live streaming with real-time chat
• Express your identity with pronouns and pride flags
• Discover content by LGBTQ+ categories
• Safe space with robust moderation tools
• Connect with creators and build community

✨ WHY BEYOU:
• Built by and for the LGBTQ+ community
• Zero tolerance for hate speech or discrimination
• Celebrate diversity and authentic expression
• Privacy-focused with granular controls
• Support for all identities and orientations

🏳️‍🌈 COMMUNITY FIRST:
BeYou prioritizes community safety and authentic connections. Our platform celebrates the full spectrum of LGBTQ+ identities and provides tools for meaningful engagement.

Join thousands of LGBTQ+ individuals sharing their stories, celebrating their identities, and building lasting connections. Your voice matters, your story is valid, and your community is here.

Download BeYou today and start being authentically you! 🌈✨`,
    
    keywords: [
      "LGBTQ+", "social media", "video sharing", "community", "pride",
      "gay", "lesbian", "bisexual", "transgender", "queer", "non-binary",
      "inclusive", "safe space", "authentic", "expression", "identity"
    ],
    
    categories: {
      primary: "Social Networking",
      secondary: "Entertainment"
    },
    
    ageRating: "17+",
    contentWarnings: [
      "Infrequent/Mild Mature/Suggestive Themes",
      "User Generated Content"
    ]
  };

  fs.writeFileSync(
    'mobile-assets/app-store-listing.json',
    JSON.stringify(listing, null, 2)
  );
  
  console.log('📝 Generated app store listing content');
}

// Generate privacy policy template
function generatePrivacyPolicy() {
  const privacyPolicy = `# BeYou Privacy Policy

Last updated: ${new Date().toLocaleDateString()}

## Introduction

BeYou ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.

## Information We Collect

### Personal Information
- Username and display name
- Email address
- Profile information (pronouns, bio, identity flags)
- Profile photos and videos you upload
- Device information and identifiers

### Usage Information
- Videos you watch, like, comment on, and share
- Search queries and interactions
- Time spent on the app and features used
- Technical information about your device and connection

## How We Use Your Information

- Provide and maintain our services
- Personalize your experience and content recommendations
- Enable communication between users
- Ensure platform safety and security
- Comply with legal obligations
- Improve our services and develop new features

## Information Sharing

We do not sell your personal information. We may share information:
- With your consent
- To comply with legal requirements
- To protect rights, property, or safety
- With service providers who assist our operations
- In connection with business transfers

## Data Security

We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Control privacy settings
- Opt out of certain communications

## LGBTQ+ Community Commitment

We are committed to creating a safe space for LGBTQ+ individuals. We:
- Prohibit discrimination and hate speech
- Provide robust reporting and blocking tools
- Respect chosen names and pronouns
- Protect sensitive identity information

## Contact Us

If you have questions about this Privacy Policy, contact us at:
- Email: privacy@beyou.app
- Website: https://beyou.app/privacy

## Changes to This Policy

We may update this Privacy Policy periodically. We will notify you of significant changes through the app or email.

By using BeYou, you agree to this Privacy Policy.`;

  fs.writeFileSync('mobile-assets/privacy-policy.md', privacyPolicy);
  console.log('📋 Generated privacy policy template');
}

// Generate terms of service template
function generateTermsOfService() {
  const termsOfService = `# BeYou Terms of Service

Last updated: ${new Date().toLocaleDateString()}

## Acceptance of Terms

By accessing or using BeYou, you agree to be bound by these Terms of Service and our Privacy Policy.

## Description of Service

BeYou is a social media platform designed for the LGBTQ+ community to share videos, live stream, and connect with others in a safe, inclusive environment.

## User Accounts

- You must be at least 13 years old to use BeYou
- Provide accurate and complete information
- Maintain the security of your account
- You are responsible for all activities under your account

## Community Guidelines

### Prohibited Content
- Hate speech or discrimination
- Harassment or bullying
- Sexually explicit content
- Violence or threats
- Spam or misleading information
- Copyright infringement

### Positive Community Standards
- Respect all users regardless of identity
- Use inclusive language
- Support and uplift community members
- Report inappropriate content
- Celebrate diversity and authenticity

## Content and Intellectual Property

- You retain ownership of content you create
- You grant BeYou license to use, display, and distribute your content
- Respect others' intellectual property rights
- We may remove content that violates these terms

## Privacy and Safety

- We are committed to protecting your privacy
- Use our reporting tools for safety concerns
- We may suspend or terminate accounts for violations
- We cooperate with law enforcement when required

## Disclaimers

- BeYou is provided "as is" without warranties
- We do not guarantee uninterrupted service
- Users are responsible for their interactions
- We are not liable for user-generated content

## Limitation of Liability

BeYou's liability is limited to the maximum extent permitted by law.

## Termination

We may terminate or suspend accounts for violations of these terms or for any reason with notice.

## Changes to Terms

We may modify these terms periodically. Continued use constitutes acceptance of changes.

## Governing Law

These terms are governed by the laws of [Your Jurisdiction].

## Contact Information

For questions about these Terms of Service:
- Email: legal@beyou.app
- Website: https://beyou.app/terms

## LGBTQ+ Commitment

BeYou is committed to being a safe, inclusive platform for LGBTQ+ individuals. We will not tolerate discrimination and will take swift action against violations of our community standards.

Your identity is valid, your voice matters, and you belong here. 🌈`;

  fs.writeFileSync('mobile-assets/terms-of-service.md', termsOfService);
  console.log('📋 Generated terms of service template');
}

// Main execution
function main() {
  console.log('🌈 BeYou App Assets Generator Starting...\n');
  
  // Create directory structure
  createDirectories();
  
  // Generate iOS icons
  console.log('\n📱 Generating iOS assets...');
  APP_ASSETS.ios.icons.forEach(icon => {
    const svgContent = generateSVGIcon(icon.size);
    const filePath = `mobile-assets/ios/icons/${icon.name.replace('.png', '.svg')}`;
    fs.writeFileSync(filePath, svgContent);
    console.log(`  ✅ ${icon.name} (${icon.size}x${icon.size}) - ${icon.desc}`);
  });
  
  // Generate iOS launch screens
  APP_ASSETS.ios.launchScreens.forEach(screen => {
    const svgContent = generateLaunchScreenSVG(screen.width, screen.height);
    const filePath = `mobile-assets/ios/launch-screens/${screen.name.replace('.png', '.svg')}`;
    fs.writeFileSync(filePath, svgContent);
    console.log(`  ✅ ${screen.name} (${screen.width}x${screen.height})`);
  });
  
  // Generate Android icons
  console.log('\n🤖 Generating Android assets...');
  APP_ASSETS.android.icons.forEach(icon => {
    const svgContent = generateSVGIcon(icon.size);
    const filePath = `mobile-assets/android/icons/${icon.name.replace('.png', '.svg')}`;
    fs.writeFileSync(filePath, svgContent);
    console.log(`  ✅ ${icon.name} (${icon.size}x${icon.size}) - ${icon.desc}`);
  });
  
  // Generate Android feature graphic
  const featureGraphic = generateLaunchScreenSVG(
    APP_ASSETS.android.featureGraphic.width,
    APP_ASSETS.android.featureGraphic.height
  );
  fs.writeFileSync(
    `mobile-assets/android/${APP_ASSETS.android.featureGraphic.name.replace('.png', '.svg')}`,
    featureGraphic
  );
  console.log(`  ✅ Feature Graphic (1024x500)`);
  
  // Generate PWA icons
  console.log('\n🌐 Generating PWA assets...');
  [192, 512].forEach(size => {
    const svgContent = generateSVGIcon(size);
    fs.writeFileSync(`public/icons/icon-${size}.svg`, svgContent);
    console.log(`  ✅ PWA Icon ${size}x${size}`);
  });
  
  // Generate app store listing
  generateAppStoreListing();
  
  // Generate legal documents
  generatePrivacyPolicy();
  generateTermsOfService();
  
  console.log('\n🎉 Asset generation complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Convert SVG files to PNG using online tools or design software');
  console.log('2. Review and customize the app store listing content');
  console.log('3. Have legal review the privacy policy and terms of service');
  console.log('4. Create app store screenshots using the generated assets');
  console.log('5. Submit to Apple App Store and Google Play Store');
  console.log('\n🌈 BeYou is ready for the app stores! 🚀');
}

// Run the generator
main();
