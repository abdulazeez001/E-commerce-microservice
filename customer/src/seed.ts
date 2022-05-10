import UserModel from './data/models/User';

const customer = {
  firstName: 'Jon',
  lastName: 'Snow',
  email: 'jonsnow@gmail.com',
  password: 'Testing#1',
};

export default function seed() {
  UserModel.deleteMany({})
    .then(() => {
      UserModel.insertMany(customer).then(function () {
        console.log('customer inserted');
      });
    })
    .catch(function (error) {
      console.log('customer already inserted');
    });
}
