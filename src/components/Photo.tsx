type PhotoProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  onChange: (src: string) => void;
};

export function Photo({ onChange, ...props }: PhotoProps) {
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      if (e.target === null) return;
      const file = (e.target as any).files[0] as Blob;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const result = canvas.toDataURL("image/jpeg");
            if (onChange) onChange(result);
          }
        };
      };
      reader.readAsDataURL(file);
    };

    input.click();
    console.log("uploading photo");
  };

  return (
    <div onClick={handleUpload}>
      <img {...props} />
    </div>
  );
}
