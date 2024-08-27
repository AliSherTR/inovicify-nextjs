import { CheckCircle2 } from "lucide-react";
import React from "react";

interface FormSuccessrProps {
    message?: string;
}

export default function FormError({ message }: FormSuccessrProps) {
    if (!message) return null;
    return (
        <div className=" bg-emerald-500/15  p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircle2 className="w-4 h-4" />
            <p>{message}</p>
        </div>
    );
}
