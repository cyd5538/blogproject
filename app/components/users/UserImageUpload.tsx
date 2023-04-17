import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const UserImageUpload: React.FC<DropzoneProps> = ({ onChange, label, value, disabled }) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback((base64: string) => {
    onChange(base64);
  }, [onChange]);

  // 드래그&드롭할 때 호출될 핸들러 함수
  const handleDrop = useCallback((files: any) => {
    const file = files[0] // 드롭존에 선택한 파일들 중 첫 번째 파일을 가져옴
    const reader = new FileReader(); // FileReader 객체를 생성
    reader.onload = (event: any) => { 
      setBase64(event.target.result); // 파일 로드한 base64 문자열을 useState 훅으로 관리하는 base64 상태에 업데이트
      handleChange(event.target.result); // 새로운 base64 문자열을 부모 컴포넌트에서 전달받은 onChange 함수로 전달
    };
    reader.readAsDataURL(file); // FileReader 객체를 사용하여 파일 로드
}, [handleChange])

  // useDropzone 훅을 사용하여 드롭존과 관련된 프로퍼티와 핸들러 함수를 생성
  const { getRootProps, getInputProps } = useDropzone({ 
    maxFiles: 1, // 최대 선택 가능한 파일 수
    onDrop: handleDrop, // 파일 선택 또는 드래그&드롭이 완료된 후 호출될 핸들러 함수
    disabled, // 드롭존을 비활성화할 지 여부
    accept: {
      'image/jpeg': [], // 허용할 이미지 파일의 MIME 타입
      'image/png': [],
    } 
  });

  return ( 
    <div {...getRootProps({className: 'relative w-full text-white text-center border-2 h-auto  mb-2 border-solid rounded-md border-neutral-700 '})}>
      <p className="text-black absolute top-[-30px]">{label}</p>
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center pt-[2px] ">
          <Image
            src={base64}
            height="120"
            width="120"
            alt="Uploaded image"
            style={{objectFit : "cover"}}
          />
          
        </div>
      ) : (
        <></>
      )}
       
    </div>
   );
}
 
export default UserImageUpload;