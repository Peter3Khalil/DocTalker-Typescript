import { HiOutlineAnnotation , HiGlobeAlt , } from "react-icons/hi";
import { RxLightningBolt } from "react-icons/rx";
import { FaBalanceScale } from "react-icons/fa";

const features = [
  {
    name: "Support PDF file",
    description:
      "You can upload your PDF files and ask questions to the chatbot and chatbot will answer your questions.",
    icon: HiGlobeAlt,
  },
  {
    name: "Star message (Soon)",
    description:
      "You can star your messages and save them for later",
    icon: FaBalanceScale,
  },
  {
    name: "Chat with Multiple Files (Soon)",
    description:
      "You can send multiple files to the chatbot and chatbot will answer your questions based on the files.",
    icon: RxLightningBolt,
  },
  {
    name: "Support Multiple Languages (Soon)",
    description:
      "You can chat with the chatbot in multiple languages.",
    icon: HiOutlineAnnotation,
  },
];

export default function Features() {
  return (
    <div className="mb-12 py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center py-10">
         
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to study well
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Doctalker is a web application that helps you to study with your
            documents. You can upload your documents and ask questions to the Ai
            and Ai will answer your questions.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
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