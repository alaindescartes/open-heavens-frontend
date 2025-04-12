import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faqs() {
  return (
    <div className="w-full flex flex-col items-start justify-center bg-gradient-to-b rounded-lg shadow-md max-w-5xl mx-auto py-10 px-6 lg:px-20">
      <div className="flex justify-center items-center flex-col w-full mb-10 gap-2">
        <h2 className="text-3xl uppercase tracking-wide  font-bold text-center mb-2 text-purple-700">
          Frequently Asked Questions
        </h2>
        <h1 className="text-4xl leading-tight font-semibold text-center mb-8 text-purple-900">
          YOUR QUESTIONS ANSWERED HERE
        </h1>
      </div>
      {/* faqs accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200">
            Do I need To Purchase A Ticket To Attend
          </AccordionTrigger>
          <AccordionContent className="bg-purple-50 rounded-md p-4 mt-2 text-gray-700 text-sm">
            The Event is free to attend, but you need to register to get a
            ticket.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200">
            Can I Bring My Children?
          </AccordionTrigger>
          <AccordionContent className="bg-purple-50 rounded-md p-4 mt-2 text-gray-700 text-sm">
            Children are welcome to attend the event.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200">
            What Parking Options Are Available?
          </AccordionTrigger>
          <AccordionContent className="bg-purple-50 rounded-md p-4 mt-2 text-gray-700 text-sm">
            Parking is available but limited at the venue, we ask that you
            kindly park at nearby lots around the venue, or carpool if possible.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200">
            Will Accommodation Be Provided For Those With Accessibility Needs?
          </AccordionTrigger>
          <AccordionContent className="bg-purple-50 rounded-md p-4 mt-2 text-gray-700 text-sm">
            Yes, the venue is also fully accessible. Please reach out to us for
            any specific accommodation needs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-200">
            Can I Attend This Event Virtually?
          </AccordionTrigger>
          <AccordionContent className="bg-purple-50 rounded-md p-4 mt-2 text-gray-700 text-sm">
            If you’re not able to join us in person, don’t worry, the event will
            be live streamed on YouTube.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Faqs;
