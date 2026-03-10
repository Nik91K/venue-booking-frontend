import { usePasswordStrength } from '@hooks/validation/usePasswordStrength';

type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const passwordStrength = usePasswordStrength(password);

  return (
    <>
      {passwordStrength && (
        <div className="grid gap-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  passwordStrength.score >= i
                    ? passwordStrength.color
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Strength:{' '}
            <span className="font-medium">{passwordStrength.label}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default PasswordStrength;
