export interface Service {
  number: string;
  name: string;
  description: string;
}

export const services: Service[] = [
  {
    number: '01',
    name: 'Website Creation',
    description:
      'Custom, responsive websites built to showcase your brand, convert visitors, and deliver a seamless experience across every device.',
  },
  {
    number: '02',
    name: 'Social Media Posts',
    description:
      'Eye-catching social media graphics and content designed to boost engagement, grow your audience, and strengthen your online presence.',
  },
  {
    number: '03',
    name: 'Ads & Banners',
    description:
      'High-impact ad creatives and banner designs that grab attention, communicate your message clearly, and drive results for your campaigns.',
  },
  {
    number: '04',
    name: 'SEO',
    description:
      'Search engine optimization strategies that improve your visibility, attract organic traffic, and help your business rank higher on Google.',
  },
  {
    number: '05',
    name: 'Digital Solutions',
    description:
      'End-to-end web-related services including landing pages, UI polish, content updates, and ongoing support to keep your digital presence sharp.',
  },
];
