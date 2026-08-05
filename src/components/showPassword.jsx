import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function ShowPassword({ showPassword, setShowPassword }) {
  return showPassword ? (
    <EyeIcon
      onClick={() => {
        setShowPassword(!showPassword);
      }}
      className="h-6 w-6 ml-2 inline text-gray-500"
    />
  ) : (
    <EyeSlashIcon
      onClick={() => {
        setShowPassword(!showPassword);
      }}
      className="h-6 w-6 ml-2 inline text-gray-500"
    />
  );
}
