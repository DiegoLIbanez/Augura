export const SummaryBox = ({ label, value, bgColor, textColor }) => (
  <div className={`${bgColor} px-3 py-1 rounded-md`}>
    <span className={`${textColor} font-medium`}>
      {label}: {value}
    </span>
  </div>
);
