import YogeshImg from '../assets/contactus-page/Yogesh.jpeg';
import NiloyImg from '../assets/contactus-page/Niloy.jpeg';
import GarvitImg from '../assets/contactus-page/Garvit.png';

const contactList = [
    {
        title: 'Coordinator',
        contact: [
            {
                name: 'Yogesh Mangawa',
                phone_number: '+91 6375292371',
                image: YogeshImg,
            },
            {
                name: 'Niloy Mondal',
                phone_number: '+91 7047571174',
                image: NiloyImg,
            },
        ],
    },
    {
        title: 'Technical Team',
        contact: [
            {
                name: 'Garvit Rai',
                phone_number: '8948406771',
                image: GarvitImg,
                //linkedin: 'https://in.linkedin.com/in/garvitrai474',
                email: 'raigarvit9@gmail.com',
            },
            {
                name: 'Aditya Dhanraj',
                phone_number: '+91 9308598841',
                image: '',
                //linkedin: 'https://in.linkedin.com/in/garvitrai474',
                email: 'adityadhanraj0003@gmail.com',
            },
        ]
    },
]

export default contactList