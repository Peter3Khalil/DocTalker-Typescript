import React, { FC, useEffect, useState } from 'react';
import {
  AiOutlineLoading3Quarters,
  FaCloudUploadAlt,
  FaFilePdf,
  MdDeleteForever,
} from './shared/Icons';
import Button from './shared/Button';
import { cn } from '../utils/helperFunctions';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { useRouter } from 'next/router';
type Error = {
  sizeError: boolean;
  typeError: boolean;
};
//TODO: Send file to server
//TODO: Check if file handwritten => if yes then show a message that "Cannot processing this file"
const uploadFile = async (file: File) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post(`${baseUrl}/upload/upload`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
};
const processFile = async (chatId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { data } = await axios.post(
    `${baseUrl}/upload/process`,
    { id: chatId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
  return data;
};
const Uploader = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<Error>({
    sizeError: false,
    typeError: false,
  });
  const MaxFileSize = 5; // 5MB
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!file) return;
    try {
      const res = await uploadFile(file);
      setIsLoading(false);
      processFile(res.chatId)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      router.push(`/chat/${res.chatId}`);
      //TODO: Save user data in State
    } catch (error) {
      alert((error as any).response.data.error || (error as any).response.data.message);
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // code here
    if (!e.target.files || !e.target.files[0]) return;
    if (!validateFile(e.target.files[0])) return;

    setFile(e.target.files[0]);
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleOnDrop = (e: React.DragEvent<HTMLLabelElement> | undefined) => {
    e?.preventDefault();
    if (!e?.dataTransfer.files[0]) return;
    if (!validateFile(e?.dataTransfer.files[0])) return;

    setFile(e?.dataTransfer.files[0]);
  };
  const validateFile = (file: File) => {
    setError({
      sizeError: false,
      typeError: false,
    });
    if (file.type !== 'application/pdf') {
      setError((prev) => ({ ...prev, typeError: true }));
      return false;
    } else if (file.size > MaxFileSize * 1024 * 1024) {
      setError((prev) => ({ ...prev, sizeError: true }));
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (error.sizeError || error.typeError) {
      setFile(null);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex w-full flex-col items-center gap-3"
    >
      <input
        type="file"
        className="hidden"
        accept="application/pdf"
        onChange={handleOnchange}
        id="input"
      />
      <label
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        htmlFor="input"
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded border-2 border-dashed border-primary bg-accent px-6 py-12 text-accent-foreground dark:border-foreground/50"
      >
        <FaCloudUploadAlt className="text-4xl text-primary" />
        <p className="text-md font-semibold text-accent-foreground">
          Drag and Drop here
        </p>
        <div className="flex w-full items-center gap-2">
          <Line />
          <span className="text-sm">or</span>
          <Line />
        </div>
        <h1 className="text-lg font-bold text-primary dark:text-accent-foreground">
          Browse
        </h1>
      </label>
      {/* Hints */}
      <div className="flex w-full flex-col items-center">
        <p
          className={cn(
            'text-xs text-accent-foreground transition-colors duration-300 ease-in-out',
            {
              'text-destructive dark:text-red-400': error.sizeError,
            },
          )}
        >
          File size should be less than{' '}
          <span className="font-bold">{MaxFileSize}MB</span>
        </p>
        <p
          className={cn(
            'text-xs text-accent-foreground transition-colors duration-300 ease-in-out',
            {
              'text-destructive dark:text-red-400': error.typeError,
            },
          )}
        >
          Supported Type: <span className="font-bold">PDF</span>
        </p>
      </div>

      {/* File */}
      {file && <FileComponent file={file} setFile={setFile} />}
      <Button
        disabled={!file}
        className={'disabled:bg-muted disabled:text-muted-foreground'}
        type="submit"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          'Upload'
        )}
      </Button>
    </form>
  );
};
const Line = () => {
  return <div className="h-[1px] w-full rounded bg-accent-foreground/20"></div>;
};

type FileComponentProps = {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
const FileComponent: FC<FileComponentProps> = ({ file, setFile }) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded bg-accent p-2 text-sm transition-all duration-300 ease-in-out',
      )}
    >
      <div className="flex items-center gap-1">
        <FaFilePdf className="text-lg leading-none text-primary" />
        <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap break-all leading-none text-accent-foreground md:w-[150px]">
          {file.name}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setFile(null)}
        className="text-xs text-destructive dark:text-red-400"
      >
        <MdDeleteForever className="text-lg leading-none" />
      </button>
    </div>
  );
};

export default Uploader;
