import React, { useState } from 'react'

export const useImageInput = (options = {}) => {

    const INPUT_PROP_ID = `input-image-${Math.floor(Math.random() * 100)}`;

    const [file, setFile] = useState(undefined);

    const option_style = options.style;

    const onClick = (event) => { document.getElementById(INPUT_PROP_ID).click(); }

    const inputProps = {
        ...options,
        id: INPUT_PROP_ID,
        type: 'file',
        onChange: (event) => { setFile(event.target.files[0]) },
        style: { ...(option_style ? option_style : {}), display: 'none' },
    };

    const removeFile = (file) => {
        setFile(undefined)
    }

    return { file, onClick, inputProps, removeFile };
}