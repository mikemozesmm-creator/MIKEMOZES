import { Album, EventItem, LeaderProfile, MinistryInfo, ScriptureItem, Testimony, Track } from '../types';

export const initialMinistryInfo: MinistryInfo = {
  ministryName: "De King's Family Music Ministry",
  tagline: "Lifting Praise, Transforming Generations",
  motto: "Worship in Spirit and in Truth — John 4:24",
  vision: "To ignite an unquenchable fire of prophetic worship, sound biblical praise, and transform lives across nations through heavenly melodies.",
  mission: "Equipping worshipers, raising an army of praise warriors, releasing spirit-breathed anthems, and ministering the presence, power, and glory of Jesus Christ to every generation.",
  foundingYear: "2012",
  email: "info@dekingsfamilymusic.org",
  phone: "+1 (800) 749-KING",
  altPhone: "+1 (555) 348-7247",
  address: "Kingdom Worship Centre, 777 Praise Avenue, Suite 100",
  cityCountry: "Atlanta, GA / Global Outreach",
  emergencyPrayerLine: "+1 (800) 555-PRAY",
  socials: {
    facebook: "https://facebook.com/dekingsfamilymusic",
    instagram: "https://instagram.com/dekingsfamilymusic",
    youtube: "https://youtube.com/@dekingsfamilymusic",
    tiktok: "https://tiktok.com/@dekingsfamilymusic",
    twitter: "https://twitter.com/dekingsmusic",
    whatsapp: "https://wa.me/18007495464"
  },
  banking: {
    bankName: "Kingdom Trust Bank / First National",
    accountName: "De King's Family Music Ministry International",
    accountNumber: "0192837465",
    sortCode: "20-44-68",
    swiftCode: "KTBUS33XXX",
    purpose: "Ministry Outreach, Album Production & Kingdom Expansion"
  }
};

export const initialTracks: Track[] = [
  {
    id: 'track-1',
    title: 'Crown of Majesty (Live)',
    subtitle: 'feat. The Royal Mass Choir',
    duration: '6:45',
    durationSeconds: 405,
    album: 'Crown of Majesty (Live in Atlanta)',
    releaseYear: '2025',
    key: 'G Major',
    bpm: 68,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    boomplayUrl: 'https://boomplay.com',
    audiomackUrl: 'https://audiomack.com',
    category: 'Prophetic Worship',
    scriptureReference: 'Revelation 4:10-11',
    featuredLead: 'Min. David & Sarah King',
    lyrics: [
      "[Verse 1]",
      "We lay our crowns before the throne of grace",
      "Gazing in awe upon Your holy face",
      "No earthly throne compares to who You are",
      "Bright Morning Star, our Great and Mighty God",
      "",
      "[Chorus]",
      "Holy, holy is the Lamb upon the throne",
      "All honour, power, majesty belong to You alone",
      "You reign in glory, high and lifted up",
      "Forever seated, Jesus You are King!",
      "",
      "[Bridge]",
      "Let the heavens roar, let the earth proclaim",
      "There is no other name, no higher name!",
      "Hallelujah, Hallelujah, Jesus reigns!"
    ],
    chords: "Intro: G - D/F# - Em7 - C (x2)\nVerse: G - C2 - Em7 - Dsus4\nChorus: G - D - Em7 - C2 - G/B - Dsus4\nBridge: Em7 - C2 - G - D (x4)"
  },
  {
    id: 'track-2',
    title: 'Sound of Revival',
    subtitle: 'Atmosphere of Glory & Healing',
    duration: '7:18',
    durationSeconds: 438,
    album: 'Crown of Majesty (Live in Atlanta)',
    releaseYear: '2025',
    key: 'D Major',
    bpm: 72,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    boomplayUrl: 'https://boomplay.com',
    audiomackUrl: 'https://audiomack.com',
    category: 'Prophetic Worship',
    scriptureReference: 'Acts 2:2-4',
    featuredLead: 'De King\'s Praise Ensemble',
    lyrics: [
      "[Verse 1]",
      "Like a rushing mighty wind, come and breathe again",
      "Open up the floodgates, let the rain descend",
      "Every heart is thirsty, every soul awake",
      "Move among Your people for Your glory's sake",
      "",
      "[Chorus]",
      "We hear the sound of revival breaking through",
      "Chains are breaking, lives made brand new",
      "Holy Spirit, fall afresh today",
      "Have Your way, have Your way!"
    ],
    chords: "Verse: D - G/B - A/C# - D\nChorus: D - A - Bm7 - G - D/F# - Asus4"
  },
  {
    id: 'track-3',
    title: 'Living Sacrifice (The Altar Cry)',
    subtitle: 'Intimate Prayer Anthem',
    duration: '5:52',
    durationSeconds: 352,
    album: 'Altar of Fire',
    releaseYear: '2024',
    key: 'C Major',
    bpm: 64,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    boomplayUrl: 'https://boomplay.com',
    audiomackUrl: 'https://audiomack.com',
    category: 'Intimate Prayer',
    scriptureReference: 'Romans 12:1-2',
    featuredLead: 'Pastor Emmanuel King',
    lyrics: [
      "[Verse 1]",
      "Take my life, a living sacrifice",
      "Holy and pleasing in Your sight",
      "All I am surrendered to Your will",
      "In the secret place, my soul be still",
      "",
      "[Chorus]",
      "Here is my heart, consume it with Your fire",
      "Jesus, You alone are my desire",
      "More of You and less of me",
      "Set my spirit holy and free"
    ],
    chords: "Verse: C - Fmaj7 - Am7 - Gsus\nChorus: F - C - G - Am7"
  },
  {
    id: 'track-4',
    title: 'High Praises in Our Mouth',
    subtitle: 'High-Energy Prophetic Praise',
    duration: '4:45',
    durationSeconds: 285,
    album: 'Sounds of Victory',
    releaseYear: '2024',
    key: 'A Major',
    bpm: 124,
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    boomplayUrl: 'https://boomplay.com',
    audiomackUrl: 'https://audiomack.com',
    category: 'Praise Celebration',
    scriptureReference: 'Psalm 149:6',
    featuredLead: 'De King\'s Band & Horns',
    lyrics: [
      "[Chorus]",
      "Let the high praises of God be in our mouth!",
      "A two-edged sword in our hands!",
      "We march in victory, we shout with joy",
      "For the Lord has triumphed over our land!"
    ],
    chords: "A - D - E - F#m - D - E - A"
  },
  {
    id: 'track-5',
    title: 'Grace Unmeasured & Unending',
    subtitle: 'Choral Hymn of Thanksgiving',
    duration: '5:30',
    durationSeconds: 330,
    album: 'Crown of Majesty (Live in Atlanta)',
    releaseYear: '2025',
    key: 'E Major',
    bpm: 70,
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    boomplayUrl: 'https://boomplay.com',
    audiomackUrl: 'https://audiomack.com',
    category: 'Choral Anthem',
    scriptureReference: 'Ephesians 2:8-9',
    featuredLead: 'Min. Grace King & Choir',
    lyrics: [
      "[Verse 1]",
      "Grace that was greater than all our sin",
      "Flowing like rivers from deep within",
      "Calvary's ransom, eternal love",
      "Poured from the Father in realms above"
    ],
    chords: "E - B/D# - C#m7 - A - B7 - E"
  },
  {
    id: 'track-6',
    title: 'Yahweh, The Ancient of Days',
    subtitle: 'Deep Prophetic Chant & Intercession',
    duration: '8:10',
    durationSeconds: 490,
    album: 'Altar of Fire',
    releaseYear: '2024',
    key: 'Bb Major',
    bpm: 60,
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    spotifyUrl: 'https://spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    boomplayUrl: 'https://boomplay.com',
    audiomackUrl: 'https://audiomack.com',
    category: 'Prophetic Worship',
    scriptureReference: 'Daniel 7:9',
    featuredLead: 'De King\'s Vocalists',
    lyrics: [
      "[Chant]",
      "Yahweh, Yahweh, Ancient of Days",
      "We bow before Your presence and Your gaze",
      "Holy, Consuming Fire, our Rock and Shield",
      "To Your majestic rule our spirits yield"
    ],
    chords: "Bb - F/A - Gm7 - Eb2 - Fsus4"
  }
];

export const initialAlbums: Album[] = [
  {
    id: 'album-1',
    title: 'Crown of Majesty (Live)',
    year: '2025',
    description: 'Recorded live with over 3,000 worshipers, this album features 12 powerful tracks declaring the sovereignty, purity, and victory of Jesus Christ.',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    totalTracks: 12,
    streamingLinks: {
      spotify: 'https://spotify.com',
      appleMusic: 'https://music.apple.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 'album-2',
    title: 'Altar of Fire',
    year: '2024',
    description: 'An intimate, soul-stirring worship encounter capturing the raw cry of consecration, repentance, and prophetic restoration.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    totalTracks: 10,
    streamingLinks: {
      spotify: 'https://spotify.com',
      appleMusic: 'https://music.apple.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 'album-3',
    title: 'Sounds of Victory',
    year: '2023',
    description: 'High-energy celebration and anthems of faith that mobilize believers into joy, thanksgiving, and kingdom advancement.',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    totalTracks: 14,
    streamingLinks: {
      spotify: 'https://spotify.com',
      appleMusic: 'https://music.apple.com',
      youtube: 'https://youtube.com'
    }
  }
];

export const initialEvents: EventItem[] = [
  {
    id: 'event-1',
    title: 'The Sovereign Sound Worship Night 2026',
    tagline: 'An Unfiltered Encounter in the Holy of Holies',
    date: '2026-09-25',
    time: '6:30 PM - 10:00 PM EST',
    venue: 'Kingdom Arena Grand Auditorium',
    city: 'Atlanta, GA',
    country: 'United States',
    eventType: 'Worship Night',
    isUpcoming: true,
    registrationOpen: true,
    registrationUrl: '#booking',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    details: 'Join De King\'s Family Music Ministry alongside special guest ministers for 4 hours of non-stop worship, healing prayers, and choral majesty.'
  },
  {
    id: 'event-2',
    title: 'Nations in Worship: London Encounter',
    tagline: 'Awakening the Next Generation of Worshipers',
    date: '2026-10-18',
    time: '5:00 PM - 9:00 PM GMT',
    venue: 'ExCeL International Centre',
    city: 'London',
    country: 'United Kingdom',
    eventType: 'Revival Conference',
    isUpcoming: true,
    registrationOpen: true,
    registrationUrl: '#booking',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    details: 'A continental gathering of worship leaders, choirs, and believers seeking an authentic move of the Holy Spirit across Europe.'
  },
  {
    id: 'event-3',
    title: 'Youth & Young Adults Prophetic Fire Camp',
    tagline: 'Sound, Purity & Consecration for Gen Z & Millennials',
    date: '2026-11-06',
    time: '10:00 AM - 8:00 PM',
    venue: 'Grace Summit Retreat Pavilion',
    city: 'Dallas, TX',
    country: 'United States',
    eventType: 'Youth Encounter',
    isUpcoming: true,
    registrationOpen: true,
    registrationUrl: '#booking',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
    details: 'Masterclasses on worship leadership, vocal training, sound engineering, and evening prophetic praise ministration.'
  },
  {
    id: 'event-4',
    title: 'Annual Holy Convocation & Thanksgiving Concert',
    tagline: 'Celebrating 14 Years of Anointed Grace',
    date: '2026-12-19',
    time: '6:00 PM EST',
    venue: 'Grand City Hall Auditorium',
    city: 'Houston, TX',
    country: 'United States',
    eventType: 'Concert',
    isUpcoming: true,
    registrationOpen: true,
    registrationUrl: '#booking',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    details: 'The end-of-year mega thanksgiving celebration featuring the entire 50-voice mass choir, orchestral brass, and live recording.'
  }
];

export const initialScriptures: ScriptureItem[] = [
  {
    id: 'scrip-1',
    reference: 'John 4:23-24',
    verse: 'Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks. God is spirit, and his worshipers must worship in the Spirit and in truth.',
    version: 'NIV',
    theme: 'Authentic Spirit-Filled Worship',
    reflection: 'Our heart is not merely to perform music, but to cultivate a sanctuary where God finds true, uncompromised devotion.'
  },
  {
    id: 'scrip-2',
    reference: 'Psalm 150:1-6',
    verse: 'Praise the Lord! Praise God in his sanctuary; praise him in his mighty heavens! Praise him with the sounding of the trumpet, praise him with the harp and lyre, praise him with timbrel and dancing... Let everything that has breath praise the Lord!',
    version: 'ESV',
    theme: 'Majesty of Instruments & Voice',
    reflection: 'Every instrument, cadence, and breath is consecrated to magnify the King above all kings.'
  },
  {
    id: 'scrip-3',
    reference: '2 Chronicles 5:13-14',
    verse: 'The trumpeters and musicians joined in unison to give praise and thanks to the Lord... Then the temple of the Lord was filled with the cloud, and the priests could not perform their service because of the cloud, for the glory of the Lord filled the temple of God.',
    version: 'NIV',
    theme: 'The Heavy Weight of Glory',
    reflection: 'When worship is offered in divine unity, human effort fades and the tangible presence of God commands the room.'
  },
  {
    id: 'scrip-4',
    reference: 'Psalm 40:3',
    verse: 'He put a new song in my mouth, a hymn of praise to our God. Many will see and fear the Lord and put their trust in him.',
    version: 'NIV',
    theme: 'Transformational Anthems',
    reflection: 'Songs born from the altar carry healing, delivering souls from despair into the marvellous light of Christ.'
  }
];

export const initialTestimonies: Testimony[] = [
  {
    id: 'test-1',
    name: 'Pastor Michael ADEBAYO',
    location: 'Lagos, Nigeria & Global Outreach',
    title: 'The Atmosphere Shifted in Seconds',
    story: 'When De King’s Family Music Ministry led worship at our 3-day Ministers Conference, the atmosphere of God’s glory broke out during the very first chord of "Crown of Majesty". People were healed and hearts melted before the altar.',
    eventOrTrack: 'Ministers Fire Conference',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-2',
    name: 'Evang. Catherine MORRISON',
    location: 'London, United Kingdom',
    title: 'Deliverance and Fresh Fire in Our Youth',
    story: 'Our youth fellowship was struggling with apathy until the team ministered. The sound was not just musically rich—it was soaked in prayer and fasting. Over 40 youth rededicated their lives to Christ.',
    eventOrTrack: 'Nations in Worship Tour',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-3',
    name: 'Elder Marcus & Victoria STERLING',
    location: 'Atlanta, Georgia',
    title: 'Anointed Choral Excellence with True Humility',
    story: 'What strikes us most about De King’s Family is their deep humility off-stage and heavenly power on-stage. Their music plays in our home daily, ushering peace and divine alignment.',
    eventOrTrack: 'Crown of Majesty Live Album',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const initialLeaders: LeaderProfile[] = [
  {
    name: "Min. David King",
    role: "Founder & Lead Worship Director",
    bio: "Called with a distinctive mandate to restore the altar of prophetic praise, Min. David has led worship across North America, Europe, and Africa with a heart committed to biblical purity and musical excellence.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Pastor Sarah King",
    role: "Co-Founder & Head of Prayer & Ministration",
    bio: "An intercessor and psalmist with deep passion for family restoration, discipleship, and spiritual breakthrough through intimate praise.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Bro. Joshua Vance",
    role: "Music Director & Orchestral Arranger",
    bio: "Master organist and choir conductor blending sacred classical harmony with dynamic contemporary African-American gospel chords.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  }
];
