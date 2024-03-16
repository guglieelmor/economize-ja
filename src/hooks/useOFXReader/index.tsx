import { useRef, useState } from 'react';

import { TransactionProps } from '@/components/History';

import { Parser } from 'xml2js';
interface Transactions {
  DTPOSTED: string;
  FITID: string;
  MEMO: string;
  TRNAMT: string;
  TRNTYPE: string;
}
interface OFX {
  OFX: {
    BANKMSGSRSV1: {
      STMTTRNRS: {
        STATUS: {
          CODE: string;
          SEVERITY: string;
        };
        STMTRS: {
          BALLIST: {
            BAL: {
              BALTYPE: string;
              DESC: string;
              NAME: string;
              VALUE: string;
            };
          };
          BANKACCTFROM: {
            ACCTID: string;
            ACCTTYPE: string;
            BANKID: string;
            BRANCHID: string;
          };
          BANKTRANLIST: {
            DTEND: string;
            DTSTART: string;
            STMTTRN: Transactions[];
          };
          CURDEF: string;
          LEDGERBAL: {
            BALAMT: string;
            DTASOF: string;
          };
          TRNUID: string;
        };
        TRNUID: string;
      };
    };
    SIGNONMSGRSV1: {
      SONRS: {
        DTSERVER: string;
        FI: {
          FID: string;
          ORG: string;
        };
        LANGUAGE: string;
        STATUS: {
          CODE: string;
          SEVERITY: string;
        };
      };
    };
  };
}
export const useOFXReader = () => {
  const [transactions, setTransactions] = useState<TransactionProps[]>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current?.click();
    }
  };

  const ofxToTransactions = (ofx: OFX): TransactionProps[] => {
    const ofxTransactions =
      ofx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
    const transactions = ofxTransactions.map((transaction) => {
      const sliceDate = transaction.DTPOSTED.slice(0, 8); //20230301
      const date =
        sliceDate.slice(0, 4) +
        '-' +
        sliceDate.slice(4, 6) +
        '-' +
        sliceDate.slice(6, 8);
      const type = transaction.TRNTYPE == 'CREDIT' ? 'income' : 'expense';
      const amount = Math.abs(parseInt(transaction.TRNAMT));
      return {
        _id: transaction.FITID,
        title: transaction.MEMO,
        date: date,
        type: type,
        amount: amount,
        category: 'Outros',
        description: ''
      };
    });

    return transactions;
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        if (file) {
          const reader = new FileReader();
          const { name } = file;
          const ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
          const isOFX = ext == 'ofx';
          reader.onload = (event) => {
            const ofx = event.target?.result;
            if (ofx && isOFX && typeof ofx == 'string') {
              const xmlData = ofx.replace(/^[\s\S]*?<OFX>/i, '<OFX>');
              const parser = new Parser({
                explicitArray: false,
                mergeAttrs: true,
                ignoreAttrs: true
              });

              parser.parseString(xmlData, (err, result: OFX) => {
                if (err) console.error(err);
                if (result) {
                  const data = ofxToTransactions(result);
                  setTransactions(data);
                }
              });
            }
          };

          reader.readAsText(file);
        }
      }
    }
  };

  return {
    handleFileChange,
    handleClick,
    transactions,
    hiddenFileInput
  };
};
