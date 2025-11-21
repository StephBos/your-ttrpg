export default function CircleLineUnderline() {
    return (
        <svg
               width="100%"
               height="10"
               viewBox="0 0 200 10"
               preserveAspectRatio="none"
               xmlns="http://www.w3.org/2000/svg"
               className="mt-2 mb-4"
            >
               <line
                  x1="0"
                  y1="5"
                  x2="90"
                  y2="5"
                  stroke="#AA8B56"
                  strokeWidth="2"
                  strokeLinecap="round"
               />

               <circle cx="100" cy="5" r="5" fill="#AA8B56" />

               <line
                  x1="110"
                  y1="5"
                  x2="200"
                  y2="5"
                  stroke="#AA8B56"
                  strokeWidth="2"
                  strokeLinecap="round"
               />
            </svg>
    )
}