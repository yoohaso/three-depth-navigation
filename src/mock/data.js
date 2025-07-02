export const navigation = [
  {
    id: 'compute',
    category: 'Compute',
    groups: [
      {
        id: 'virtualization',
        group: 'EC2 & Virtualization',
        services: ['Amazon EC2', 'Amazon Lightsail', 'VMware Cloud on AWS'],
      },
      {
        id: 'container',
        group: 'Container Services',
        services: ['Amazon ECS', 'Amazon EKS', 'AWS Fargate'],
      },
    ],
  },
  {
    id: 'storage',
    category: 'Storage',
    groups: [
      {
        id: 'block storage',
        group: 'Object & Block Storage',
        services: ['Amazon S3', 'Amazon EBS', 'Amazon EFS'],
      },
      {
        id: 'archive',
        group: 'Backup & Archive',
        services: ['AWS Backup', 'Amazon S3 Glacier', 'AWS Storage Gateway'],
      },
    ],
  },
  {
    id: 'maching learning',
    category: 'Machine Learning',
    groups: [
      {
        id: 'ml services',
        group: 'ML Services',
        services: ['Amazon SageMaker', 'Amazon Comprehend', 'Amazon Rekognition'],
      },
      {
        id: 'ai services',
        group: 'AI Services',
        services: ['Amazon Translate', 'Amazon Polly', 'Amazon Lex'],
      },
    ],
  },
];
