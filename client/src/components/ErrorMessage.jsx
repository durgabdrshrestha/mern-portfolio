const ErrorMessage = ({
  message = "Something went wrong.",
}) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900 dark:bg-red-950">
      {message}
    </div>
  );
};

export default ErrorMessage;