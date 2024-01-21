import { HiOutlineAnnotation, HiGlobeAlt } from 'react-icons/hi';
import { RxLightningBolt } from 'react-icons/rx';
import { FaBalanceScale } from 'react-icons/fa';

const features = [
  {
    name: 'Support PDF file',
    description:
      'You can upload your PDF files and ask questions to the chatbot and chatbot will answer your questions.',
    icon: HiGlobeAlt,
  },
  {
    name: 'Star message (Soon)',
    description: 'You can star your messages and save them for later',
    icon: FaBalanceScale,
  },
  {
    name: 'Chat with Multiple Files (Soon)',
    description:
      'You can send multiple files to the chatbot and chatbot will answer your questions based on the files.',
    icon: RxLightningBolt,
  },
  {
    name: 'Support Multiple Languages (Soon)',
    description: 'You can chat with the chatbot in multiple languages.',
    icon: HiOutlineAnnotation,
  },
];

export default function Features() {
  return (
    <div className="mb-12 bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="py-10 lg:text-center">
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            A better way to study well
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Doctalker is a web application that helps you to study with your
            documents. You can upload your documents and ask questions to the Ai
            and Ai will answer your questions.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
