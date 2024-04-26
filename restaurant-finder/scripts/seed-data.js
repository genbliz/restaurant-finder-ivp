require('dotenv').config();

const locations = [
  {
    name: 'Sweet Sensation',
    city: 'lagos',
    address: 'Alagomeji Yaba',
    latitude: 6.50097794522267,
    longitude: 3.3784233846579013,
  },
  {
    name: 'Bukka Hut',
    city: 'lagos',
    address: '271 Herbert Macaulay Wy, Alagomeji-Yaba, Lagos',
    latitude: 6.500339909859682,
    longitude: 3.377934584697815,
  },
  {
    name: 'The Place',
    city: 'lagos',
    address: '36 Adeniran Ogunsanya St, Surulere, Lagos',
    latitude: 6.49653885208961,
    longitude: 3.3576334540135817,
  },
  {
    name: 'Ntachi-Osa',
    city: 'enugu',
    address: '97 Chime Ave, New Haven, Enugu',
    latitude: 6.458957490541787,
    longitude: 7.519599838671409,
  },
  {
    name: 'Mega Chicken',
    city: 'lagos',
    address: 'First Gate, Agidingbi, Ikeja, Lagos',
    latitude: 6.626366493885883,
    longitude: 3.353528096342863,
  },
  {
    name: 'Mega chicken - Amuwo',
    city: 'lagos',
    address: 'Festac Access Rd, Amuwo Odofin Estate, Lagos',
    latitude: 6.471336468380232,
    longitude: 3.312662625178016,
  },
];

async function doSeed() {
  for (let item of locations) {
    const response = await fetch(
      `http://localhost:${process.env.PORT}/restaurants`,
      {
        body: JSON.stringify(item),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    await response.json();
  }
}

doSeed()
  .then(() => {
    console.log('Seeded Successfully!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(0);
  });
