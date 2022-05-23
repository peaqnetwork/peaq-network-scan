export default function JsonToTable({ json }) {
  const obj = JSON.parse(json);
  return (
    <table className="bordered">
      <tbody>
        {Object.keys(obj).map((key) => (
          <tr key={key}>
            {!Array.isArray(obj) && (
              <td className="bordered">{key.replace(/_/g, " ")}</td>
            )}
            {(() => {
              if (obj[key] && typeof obj[key] === "object") {
                return (
                  <td className="bordered">
                    <JsonToTable json={obj[key]} />
                  </td>
                );
              }
              return (
                <td className="bordered">
                  <span dangerouslySetInnerHTML={{ __html: obj[key] }} />
                </td>
              );
            })()}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
