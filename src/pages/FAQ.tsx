import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ArrowLeft } from 'lucide-react';

const FAQ = () => {
  const faqData = [
    {
      question: "What is Knoshr?",
      answer: "Knoshr is a meal prep community platform where you can join tables, share recipes, and coordinate meal preparation with others in your area."
    },
    {
      question: "How do I join a meal table?",
      answer: "You can browse available tables on the dashboard or use an invite code from a friend to join their table directly."
    },
    {
      question: "What are the different diet types supported?",
      answer: "We support various dietary preferences including Vegetarian, Vegan, Keto, Paleo, Mediterranean, Low-Carb, Gluten-Free, and more."
    },
    {
      question: "How does the AI assistant help save money?",
      answer: "Our AI assistant helps adapt recipes for different group sizes, calculates portions, suggests the most cost-effective shopping strategies, and provides store-specific shopping lists to reduce food waste."
    },
    {
      question: "Can I create my own meal table?",
      answer: "Yes! You can create your own table and invite friends to join your meal prep community."
    },
    {
      question: "Is Knoshr free to use?",
      answer: "Basic features are free. Premium features like advanced AI assistance may require a subscription."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-orange-500">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;