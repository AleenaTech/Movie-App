import React from "react";

interface InputSearchFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearchField: React.FC<InputSearchFieldProps> = ({
    value,
    onChange,
}) => {
    return (
        <div className="search-container">
            <input
                type="search"
                value={value}
                placeholder="Search movie here"
                onChange={onChange}
            />
        </div>
    );
};

export default InputSearchField;
