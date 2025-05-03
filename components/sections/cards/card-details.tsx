import { cardService } from "@/app/api/lib/card";
import { ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { Check, Copy } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export const CardDetails = ({
  expiry_date,
  card_number,
  card_name,
  cvv,
  billing_address,
  zip_code,
}: CardDetailsProps) => {
  const cardNumber = cardService.decryptCardNumber(card_number);
  const cardCVV = cardService.decryptCVV(cvv);

  return (
    <ModalContent>
      <ModalHeader>
        <ModalTitle>
          <span className="max-md:sr-only">Card Details</span>
        </ModalTitle>
      </ModalHeader>
      <div className="flex flex-col gap-4 px-4 md:px-0 pb-10 md:pb-0">
        <div className="flex flex-col gap-4">
          <CardDtlItem label="Card Name" value={card_name} />
          <CardDtlItem label="Card Number" value={cardNumber} />
          <CardDtlItem label="CVV" value={cardCVV} />
          <CardDtlItem label="Expiry Date" value={expiry_date} />
          <CardDtlItem label="Billing Address" value={billing_address} />
          <CardDtlItem label="Zip Code" value={zip_code} />
        </div>
      </div>
    </ModalContent>
  );
};

const CardDtlItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    copyToClipboard(value.toString())
      .then((success) => {
        if (success) {
          setIsCopied(true);

          timeoutRef.current = setTimeout(() => {
            setIsCopied(false);
            timeoutRef.current = null;
          }, 1500);
        } else {
          console.error("Failed to copy text to clipboard.");
        }
      })
      .catch((err) => {
        console.error("Error copying text:", err);
      });
  };

  return (
    <div className="flex flex-col font-medium">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex flex-row items-center gap-2">
        <p className="">{value}</p>
        <button
          onClick={handleCopy}
          className="py-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
          aria-label={`Copy ${label}`}
          disabled={isCopied}
        >
          {isCopied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

type CardDetailsProps = {
  expiry_date: string;
  card_number: string;
  card_name: string;
  cvv: string;
  billing_address: string;
  zip_code: string;
};
