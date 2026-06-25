import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportPdf({ userInfo, experience, education, skills }) {
  const contentRef = useRef(null);

  async function handleExport() {
    const element = contentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("resume.pdf");
  }

  return (
    <>
      <div ref={contentRef} className="pdfContent">
        {userInfo.name && <h1>{userInfo.name}</h1>}
        <p>
          {userInfo.email}
          {userInfo.email && userInfo.phone ? " | " : ""}
          {userInfo.phone}
        </p>
        {userInfo.summary && <p className="summary">{userInfo.summary}</p>}

        <hr />

        {experience.length > 0 && (
          <>
            <h2>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="pdfItem">
                <h3>{exp.title}</h3>
                <p>{exp.company} &mdash; {exp.start_date} to {exp.end_date}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <h2>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="pdfItem">
                <h3>{edu.course}</h3>
                <p>{edu.school} &mdash; {edu.start_date} to {edu.end_date}</p>
                {edu.grade && <p>Grade: {edu.grade}</p>}
              </div>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <h2>Skills</h2>
            <ul>
              {skills.map((skill) => (
                <li key={skill.id}>
                  {skill.name} {skill.proficiency ? `(${skill.proficiency})` : ""}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button onClick={handleExport} className="exportBtn">
        Export as PDF
      </button>
    </>
  );
}
