import { TriangleAlertIcon } from "lucide-react";
import React from "react";

interface FormErrorProps {
    message?: string;
}

export default function FormError({ message }: FormErrorProps) {
    if (!message) return null;
    return (
        <div className=" bg-red-500/15  p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
            <TriangleAlertIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    );
}
