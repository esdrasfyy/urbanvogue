import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
} from "@chakra-ui/react";
interface Detail {
  detail: string;
}
interface AccordionsProps {
  summary: string;
  details: Detail[];
}
function Accordions({ summary, details }: AccordionsProps) {
  return (
    <>
      {" "}
      <Divider orientation="horizontal" className="mt-12" />
      <Accordion
        defaultIndex={[1]}
        allowMultiple
        className="flex flex-col gap-5 mt-8"
      >
        <AccordionItem className="border-none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" className="text-xl">
                Summary
              </Box>
              <AccordionIcon
                color={"#ed145b"}
                marginRight={"-10px"}
                fontSize={"40px"}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="text-custom-textColor/70">
            {summary}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" className="text-xl">
                Details
              </Box>
              <AccordionIcon
                color={"#ed145b"}
                marginRight={"-10px"}
                fontSize={"40px"}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ol className="list-disc pl-6 flex flex-col gap-4 text-custom-textColor/70">
              {details.map(
                (detail, index) =>
                  detail &&
                  detail.detail.trim() !== "" && (
                    <li key={index}>{detail.detail}</li>
                  )
              )}
            </ol>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export { Accordions };
