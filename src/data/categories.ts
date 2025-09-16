import { getAllPosts, getPostsDefault, TPost } from './posts'

// TODO: replace with actual images
// TODO: replace with actual images
// _demo_category_image_urls has length 10
const _demo_category_image_urls = [
  'https://images.unsplash.com/photo-1539477857993-860599c2e840?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1636306950045-4dbb10b7e0f4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1679913969285-64f089885005?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1680792563719-288027b2a090?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1679403855896-49b0bd34744a?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1660254149750-f31f1c59a86b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1462611290231-f44865b5750c?q=80&w=2271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

// CATEGORIES
export async function getCategories() {
  return [
    {
      id: 'category-1',
      _id: 'category-1',
      name: 'Muhammed',
      handle: 'muhammed',
      description:
        'Explore the life, teachings, and legacy of Prophet Muhammad (PBUH). Discover his wisdom, character, and the profound impact he had on the world.',
      color: 'indigo',
      count: 13,
      date: '2025-06-10',
      icon: {
        src: '/images/categories/category_1.png',
        alt: 'Muhammed',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[0],
        alt: 'Muhammed',
        width: 1920,
        height: 1080,
      },
      categoryName: 'Muhammed',
      postCount: 13,
      featuredImage: {
        src: _demo_category_image_urls[0],
        alt: 'Muhammed',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[0],
        alt: 'Muhammed',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-2',
      _id: 'category-2',
      name: `Holy Qur'an`,
      handle: 'holy-quran',
      description:
        "Explore the divine revelations, wisdom, and guidance found in the Holy Qur'an. Discover its teachings, interpretations, and spiritual significance.",
      color: 'blue',
      count: 25,
      date: '2025-05-15',
      icon: {
        src: '/images/categories/category_2.png',
        alt: `Holy Qur'an`,
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: `Holy Qur'an`,
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: `Holy Qur'an`,
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: `Holy Qur'an`,
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-3',
      _id: 'category-3',
      name: 'Islam for Beginners',
      handle: 'islam-for-beginners',
      description:
        'A comprehensive guide for those new to Islam. Learn about the basic principles, practices, and beliefs that form the foundation of Islamic faith.',
      color: 'red',
      count: 18,
      date: '2025-04-20',
      icon: {
        src: '/images/categories/category_3.png',
        alt: 'Islam for Beginners',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[2],
        alt: 'Islam for Beginners',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[2],
        alt: 'Islam for Beginners',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[2],
        alt: 'Islam for Beginners',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-4',
      _id: 'category-4',
      name: 'Pillars of Faith',
      handle: 'pillars-of-faith',
      description:
        'Explore the fundamental pillars of Islamic faith - Shahada, Salah, Zakat, Sawm, and Hajj. Understand their significance and practice.',
      color: 'green',
      count: 22,
      date: '2025-03-05',
      icon: {
        src: '/images/categories/category_4.png',
        alt: 'Pillars of Faith',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[3],
        alt: 'Pillars of Faith',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[3],
        alt: 'Pillars of Faith',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[3],
        alt: 'Pillars of Faith',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-5',
      _id: 'category-5',
      name: 'Schools of Thought',
      handle: 'schools-of-thought',
      description:
        'Explore the different Islamic schools of thought and their interpretations. Understand the diversity within Islamic scholarship and jurisprudence.',
      color: 'yellow',
      count: 30,
      date: '2025-02-15',
      icon: {
        src: '/images/categories/category_5.png',
        alt: 'Schools of Thought',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[4],
        alt: 'Schools of Thought',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[4],
        alt: 'Schools of Thought',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[4],
        alt: 'Schools of Thought',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-6',
      _id: 'category-6',
      name: 'Photography',
      handle: 'photography',
      description:
        'Discover the art of photography, from landscape shots to portrait techniques and editing tips. Capture the beauty of the world with our expert tips and advice.',
      color: 'purple',
      count: 28,
      date: '2025-01-20',
      icon: {
        src: '/images/categories/category_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[5],
        alt: 'Photography',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[5],
        alt: 'Photography',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[5],
        alt: 'Photography',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-7',
      _id: 'category-7',
      name: 'Music',
      handle: 'music',
      description:
        'Explore music reviews, artist interviews, and the latest trends in the music industry. Stay updated with the latest music news and trends.',
      color: 'pink',
      count: 35,
      date: '2025-01-15',
      icon: {
        src: '/images/categories/category_3.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[6],
        alt: 'Music',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[6],
        alt: 'Music',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[6],
        alt: 'Music',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-8',
      _id: 'category-8',
      name: 'Architecture',
      handle: 'architecture',
      description:
        'Discover architectural marvels, design trends, and insights into the world of building and construction. Explore the world of architecture with our expert tips and advice.',
      color: 'gray',
      count: 22,
      date: '2025-01-10',
      icon: {
        src: '/images/categories/category_5.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[7],
        alt: 'Architecture',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[7],
        alt: 'Architecture',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[7],
        alt: 'Architecture',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-9',
      _id: 'category-9',
      name: 'Wellness',
      handle: 'wellness',
      description:
        'Find tips and advice for mental and physical wellness, including meditation, yoga, and healthy living. Stay fit and healthy with our expert tips and advice.',
      color: 'teal',
      count: 27,
      date: '2025-01-05',
      icon: {
        src: '/images/categories/category_4.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[8],
        alt: 'Wellness',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[8],
        alt: 'Wellness',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[8],
        alt: 'Wellness',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-10',
      _id: 'category-10',
      name: 'Education',
      handle: 'education',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'orange',
      count: 31,
      date: '2025-01-01',
      icon: {
        src: '/images/categories/category_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[9],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[9],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[9],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-11',
      _id: 'category-11',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_2.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-12',
      _id: 'category-12',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_4.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-13',
      _id: 'category-13',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_2.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-14',
      _id: 'category-14',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_3.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-15',
      _id: 'category-15',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-16',
      _id: 'category-16',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_icon_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-17',
      _id: 'category-17',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_icon_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-18',
      _id: 'category-18',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_icon_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
    {
      id: 'category-19',
      _id: 'category-19',
      name: 'Typography',
      handle: 'typography',
      description:
        'Stay informed about educational trends, learning resources, and academic insights. Stay updated with the latest educational news and trends.',
      color: 'sky',
      count: 31,
      date: '2025-06-15',
      icon: {
        src: '/images/categories/category_icon_1.png',
        alt: 'Islam',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: _demo_category_image_urls[1],
        alt: 'Education',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
    },
  ]
}

export async function getCategoryByHandle(handle: string) {
  // lower case handle and normalize for URL-friendly format
  handle = handle?.toLowerCase().trim()

  // for demo purpose, get all posts
  const posts = (await getAllPosts()).slice(0, 12)

  if (handle === 'all') {
    return {
      id: 'category-all',
      _id: 'category-all',
      name: 'All articles',
      handle: 'all',
      description: 'Explore all articles',
      count: 2500,
      date: '2025-01-01',
      icon: {
        src: '/images/categories/category_icon_1.png',
        alt: 'All articles',
        width: 1920,
        height: 1080,
      },
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'All',
        width: 1920,
        height: 1080,
      },
      featuredImage: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'All',
        width: 1920,
        height: 1080,
      },
      featuredIcon: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'All',
        width: 1920,
        height: 1080,
      },
      subCategory: [
        {
          _id: '689d968acaf50515b99b0ac9',
          name: 'Life and Message',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/1_Life_and_Message.png',
          shortDescription: 'Life and Message',
        },
        {
          _id: '689d9c5bcaf50515b99b0ad5',
          name: 'Signs of Prophethood',
          featuredImage: '',
          featuredIcon:
            'https://preface-drive.blr1.digitaloceanspaces.com/preface-space/uploads/categories/icons/2_Signs_of_Prophethood.png',
          shortDescription: 'Signs of Prophethood',
        },
      ],
      cover: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'All',
        width: 1920,
        height: 1080,
      },
      color: 'indigo',
      posts,
    }
  }

  // get all categories
  const categories = await getCategories()

  // Use the slug utility for better matching
  const { findBySlug } = await import('@/utils/slug')
  const category = findBySlug(handle, categories)

  if (!category) {
    return null // Return null for proper 404 handling
  }

  return {
    ...category,
    posts,
  }
}

export async function getCategoriesWithPosts() {
  const categories = await getCategories()
  const posts = await getPostsDefault()
  return categories.map((category) => ({
    ...category,
    posts: posts.slice(0, 8),
  }))
}

// TAGS
export async function getTags() {
  return [
    {
      id: 'tag-1',
      _id: 'tag-1',
      name: 'Technology',
      handle: 'technology',
      description: 'Explore the latest innovations, gadgets, and tech trends shaping our digital future.',
      count: 10,
    },
    {
      id: 'tag-2',
      _id: 'tag-2',
      name: 'Travel',
      handle: 'travel',
      description: 'Explore travel guides, destination reviews, and adventure stories from around the world.',
      count: 10,
    },
    {
      id: 'tag-3',
      _id: 'tag-3',
      name: 'Food',
      handle: 'food',
      description: 'Discover the best food and drink experiences, from local cuisine to gourmet dining.',
      count: 10,
    },
    {
      id: 'tag-4',
      _id: 'tag-4',
      name: 'Health',
      handle: 'health',
      description: 'Stay updated with health and wellness news, tips, and expert advice.',
      count: 10,
    },
    {
      id: 'tag-5',
      _id: 'tag-5',
      name: 'Science',
      handle: 'science',
      description: 'Explore the latest scientific discoveries, research, and breakthroughs.',
      count: 10,
    },
    {
      id: 'tag-6',
      _id: 'tag-6',
      name: 'History',
      handle: 'history',
      description: 'Discover historical events, cultural heritage, and the stories of our past.',
      count: 10,
    },
    {
      id: 'tag-7',
      _id: 'tag-7',
      name: 'Art',
      handle: 'art',
      description: 'Explore the world of art, from painting to sculpture and everything in between.',
      count: 10,
    },
    {
      id: 'tag-8',
      _id: 'tag-8',
      name: 'Photography',
      handle: 'photography',
      description: 'Discover the art of photography, from landscape shots to portrait techniques and editing tips.',
      count: 15,
    },
    {
      id: 'tag-9',
      _id: 'tag-9',
      name: 'Music',
      handle: 'music',
      description: 'Explore music reviews, artist interviews, and the latest trends in the music industry.',
      count: 12,
    },
    {
      id: 'tag-10',
      _id: 'tag-10',
      name: 'Architecture',
      handle: 'architecture',
      description:
        'Discover architectural marvels, design trends, and insights into the world of building and construction.',
      count: 8,
    },
    {
      id: 'tag-11',
      _id: 'tag-11',
      name: 'Wellness',
      handle: 'wellness',
      description:
        'Find tips and advice for mental and physical wellness, including meditation, yoga, and healthy living.',
      count: 14,
    },
    {
      id: 'tag-12',
      _id: 'tag-12',
      name: 'Education',
      handle: 'education',
      description: 'Stay informed about educational trends, learning resources, and academic insights.',
      count: 11,
    },
  ]
}

export async function getTagsWithPosts() {
  const tags = await getTags()
  const posts = await getPostsDefault()
  return tags.map((tag) => ({
    ...tag,
    posts: posts.slice(0, 8),
  }))
}

export async function getTagByHandle(handle: string) {
  // lower case handle
  handle = handle?.toLowerCase()

  const posts = (await getAllPosts()).slice(0, 12)

  if (handle === 'all') {
    return {
      id: 'tag-all',
      _id: 'tag-all',
      name: 'All articles',
      handle: 'all',
      description: 'Explore all articles',
      count: 2500,
      posts,
    }
  }

  const tags = await getTags()
  let tag = tags.find((tag) => tag.handle === handle)
  if (!tag) {
    // return null
    // for demo purpose, return the first tag
    tag = tags[0]
  }
  return {
    ...tag,
    posts,
  }
}

// Types
export type TCategory = Awaited<ReturnType<typeof getCategories>>[number] & {
  posts?: TPost[]
  slug?: string
  parentCategory?: any
}

export type TTag = Awaited<ReturnType<typeof getTags>>[number] & {
  posts?: TPost[]
}
