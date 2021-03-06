const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'So Many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
  {name: 'Lamont George', email: 'monty@george.com', password: '1234'}, 
  {name: 'Hyacinth Mary', email: 'hyacinth@mary.com', password: '1234'}, 
  {name: 'Bob Henry', email: 'bob@henry.com', password: '1234'}, 
  {name: 'Chicken George', email: 'chicken@popeyes.com', password: '1234'}, 
  {name: 'Spongebob Squarepants', email: 'bikini@bottom.com', password: '1234'}, 
  {name: 'Squidward Henry', email: 'clarinet@society.com', password: '1234'},
  {name: 'Cara Weber', email: 'cara@gmail.com', password: '1234'}, 
  {name: 'Ashi Krishnan', email: 'ashi@ashi.com', password: '1234'},
], user => db.model('users').create(user))

const seedStickers = () => db.Promise.map([
  {name: 'Save a Puppy', category: 'Animal Health and Happiness', price: '17.39', picture: 'https://ih1.redbubble.net/image.60977294.4128/sticker,375x360.u1.png',
    wish: 'Each year, millions of dogs, cats, and other animals end up in shelters in the US.  The lucky ones get adopted quickly, but many more remain in shelter care for months or years; millions are also euthanized each year. Your purchase of the "Save a Puppy" swish makes a donation to an animal care shelter where volunteers keep animals healthy and give them as much love and care as possible in an often overcrowded environment.'},
  {name: 'Rainforest', category: 'Enviornment', price: '12.99', picture: 'http://www.unixstickers.com/image/data/stickers/bower/Bower.sh.png',
    wish: 'Rainforests form a crucial aspect of the planetary carbon cycle, as well as providing environments for species that can be found nowhere else on the planet.  The ongoing destruction of rainforests for agriculture and other kinds of development jeopardizes the future of all living things. Your purchase of the "Rainforest" swish makes a donation to environmental groups working through scientific and political channels to preserve these regions of astonishing biodiversity.  '},
  {name: 'Day of the Dead', category: 'Mexican', price: '39.74', picture:'https://ih1.redbubble.net/image.120480953.2435/sticker,375x360.png',
    wish: 'Immigration is never an easy experience, and contemporary Mexican immigrants to the US find themselves in an especially difficult position as the targets of callous political rhetoric and uninformed prejudice.  Symbol of the holiday when Mexicans remember and celebrate their ancestors, the "Day of the Dead" swish honors familial connections and intercultural exchange.  Your purchase of this swish makes a donation to a group working on some of the issues which affect a significant portion of Mexican immigrants, like immigration policy reform, access to legal representation for immigrants and their families, and campaigns for agricultural labor rights.'},
  {name: 'Pizza for the Homeless', category: 'Food', price: '2.99', picture: 'http://d6ce0no7ktiq.cloudfront.net/images/preview/2015/10/05/design-5762/template-sticker-600x600.png',
    wish: 'It is frankly appalling that in a city as wealthy as NYC, tens of thousands of people are homeless.  Your purchase of the "Pizza for the Homeless" swish makes a donation to an NYC organization seeking to meet their needs for food, shelter, medical care, and vocational training.'},
  {name: 'Git', category: 'Technology', price: '139.74', picture:'https://d21ii91i3y6o6h.cloudfront.net/gallery_images/from_proof/1488/medium/1402940451/git-icon-stickers.png',
    wish: 'Support software access for all!  Your purchase of the "Git" swish makes a donation to an open-source, free, or otherwise publically-available technology project.'},
  {name: 'Hurricane Relief', category: 'Enviornment', price: '50.00', picture: 'http://www.unixstickers.com/image/data/stickers/debian/debian_shaped.sh.png',
    wish: 'Hurricanes hurt.  Your purchase of the "Hurricane Relief" swish donates to the Red Cross or other relief agency to enable the work of volunteers and first responders helping hurricane victims to put their lives back together again'},
  {name: 'Stop People from Smoking!!!', category: 'Health', price: '27.37', picture: 'http://images.mydoorsign.com/img/lg/S/no-smoking-modular-door-sign-s-9696.png',
    wish: 'Hate lung / throat / mouth cancer?  Buy this swish to contribute to anti-smoking campaigns with a special focus on the prevention of smoking among adolescents.'},
  {name: 'Help the Single Stop being Single', category: 'Mental Health', price: '37.00', picture: 'http://www.bumperstickerz.com/images/1000345-04-00-00-00_lg.png',
    wish: 'Being single can be great, except for those who really don not want to be single!  Purchase of this swish makes a donation to community-based organizations that promote social interaction to build friendships and maybe something more ... '},
  {name: 'Keep Mother Earth Clean', category: 'Enviornment', price: '16.37', picture: 'https://www.peaceproject.com/sites/default/files/imagecache/700wide-500-high/LS190-Peace-Dove-Bumper-Sticker.png',
    wish: 'Despite what you might glean from the current US presidential election coverage, pollution is a huge threat to the human way of life in the US and beyond.  Protestors in Standing Rock are risking their lives to protect a vital fresh water source from the inevitability of pipeline spills.  Concerned citizens across the country are pushing back against top-down local laws that give multinational conglomerates the right to confiscate private land for fracking.  Your purchase of this swish contributes to these legal and political efforts.'},
  {name: 'Help Cancer Patients Celebrate Their Birthday', category: 'Health', price: '47.57', picture: 'https://ih1.redbubble.net/image.120563886.3008/sticker,375x360.u3.png',
    wish: 'Many organizations staffed by volunteers work to improve quality of life for those suffering from severe illness like cancer.  Purchase of this swish contributes to their efforts.'},
], sticker => db.model('stickers').create(sticker))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedStickers)
  .then(stickers => console.log(`Seeded ${stickers.length} stickers OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
