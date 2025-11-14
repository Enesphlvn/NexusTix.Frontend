interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderRadius: "8px",
        margin: "2rem",
        textAlign: "center",
        border: "1px solid #f5c6cb",
      }}
    >
      🚨 Hata: {message}
    </div>
  );
};

export default ErrorMessage;
