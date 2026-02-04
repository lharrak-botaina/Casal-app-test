import { CVPersonalInfo, CVEducation, CVExperience, CVSkills, CVLevelOfStudy } from './../models/young_cv';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class DocumentCreatorService {

  constructor(private datePipe : DatePipe) {
  }

  // tslint:disable-next-line: typedef
  public create(personalInfo : CVPersonalInfo,
                photoBuffer : ArrayBuffer,
                levelOfStudy : CVLevelOfStudy,
                educations : CVEducation[],
                experiences : CVExperience[], 
                skills : CVSkills[],
                languages : string[], 
                hobbies : string[]): Document {
    return new Document({
      sections: [
        {
          children: [
            this.createContactTitle(personalInfo),
            ...this.createContactInfo(personalInfo),
            this.createContactPhoto(photoBuffer),

            this.createHeading('Niveau d\'études'),
            this.createContactLevelOfStudy(levelOfStudy),

            this.createHeading('Formations'),
            ...this.createContactEducations(educations),

            this.createHeading('Expériences professionnelles'),
            ...this.createContactExperiences(experiences),

            this.createHeading('Compétences'),
            ...this.createContactSkills(skills),

            this.createHeading('Langues'),
            this.createContactLanguagues(languages),

            this.createHeading('Loisirs'),
            this.createContactHobbies(hobbies),
          ],
        },
      ],
    });
  }

  createContactTitle(personalInfo : CVPersonalInfo): Paragraph {
    return new Paragraph({
      text: personalInfo?.fullname,
      heading: HeadingLevel.TITLE,
    })
  }

  createContactInfo(personalInfo : CVPersonalInfo): Paragraph[] {
    return [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text : 'Date de naissance: ',
            bold: true
          }),
          new TextRun(
            `${this.DateTo_dd_MM_YYYY(personalInfo?.birth_date)}`
          ),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text : 'Téléphone: ',
            bold: true
          }),
          new TextRun(
            `${personalInfo?.phone}`
          ),
        ],
      }),
      new Paragraph({
        children : [
          new TextRun({
            text : 'Adresse: ',
            bold: true
          }),
          new TextRun(`${personalInfo?.address} ${personalInfo?.city}`),
        ]
      })
    ];
  }

  createContactPhoto(photoBuffer) : Paragraph {
    if(!photoBuffer) return;

    return new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
          new ImageRun({
              data: photoBuffer,
              transformation: {
                  width: 100,
                  height: 100,
              },
              floating: {
                zIndex: 50,
                horizontalPosition: {
                    offset: 5514400,
                },
                verticalPosition: {
                    offset: 1014400,
                },
            },
          }),
      ],
    })
  }

  createContactLevelOfStudy(levelOfstudy : CVLevelOfStudy) : Paragraph{
    return new Paragraph({
      children: [  
            new TextRun(
              `${levelOfstudy?.level}`
            ), 
            new Paragraph({
              children: [],  // Just newline without text
            }),
      ],
    })
  }

  createContactEducations(educations : CVEducation[]){
    return educations
              .map((education) => {
                const arr: Paragraph[] = [];
                arr.push(
                  this.createInstitutionHeader(
                    education?.type_formation,
                    `${this.DateTo_dd_MM_YYYY(education?.start_date)} - ${this.DateTo_dd_MM_YYYY(education?.end_date)}`
                  )
                );
                arr.push(
                  this.createKeyValueInfo('Spécialité: ', education?.specialty ),
                  this.createKeyValueInfo('Etablissement: ', education?.institution ),
                  this.createKeyValueInfo('Certifcat / Diplôme : ', education?.cetificate ),
                  this.createKeyValueInfo('Description : ', education?.comment ),
                  this.createKeyValueInfo('', '')
                );

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), [])
  }

  createContactExperiences(experiences : CVExperience[]){
    return experiences
              .map((position) => {
                const arr: Paragraph[] = [];

                arr.push(
                  this.createInstitutionHeader(
                    position.genre,
                    `${this.DateTo_dd_MM_YYYY(position?.start_date)} - ${this.DateTo_dd_MM_YYYY(position?.end_date)}`
                  )
                );
                arr.push(
                  this.createKeyValueInfo('Spécialité: ', position?.function ),
                  this.createKeyValueInfo('Etablissement: ', position?.institution),
                  this.createKeyValueInfo('Description : ', position?.comment ),
                  this.createKeyValueInfo('', '')
                );

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), [])
  }

  createContactSkills(skills : CVSkills[]){
    return skills
            .map((skill) => {
              const arr: Paragraph[] = [];

              arr.push(
                this.createKeyValueInfo(`${skill?.title}: `, skill?.value),
              );

              return arr;
            })
            .reduce((prev, curr) => prev.concat(curr), [])
  }

  createContactLanguagues(languages : string[]) : Paragraph{
    return new Paragraph({
      children: [
        ...languages
        .map((language) => {
          const arr: TextRun[] = [];
          arr.push(
            new TextRun(
              `${language}, `
            )
          );

          return arr;
        }).reduce((prev, curr) => prev.concat(curr), [])
      ],
    })
  }

  createContactHobbies(hobbies : string[]) : Paragraph{
    return new Paragraph({
      children: [
        ...hobbies
        .map((hobby) => {
          const arr: TextRun[] = [];
          arr.push(
            new TextRun(
              `${hobby}, `
            )
          );

          return arr;
        }).reduce((prev, curr) => prev.concat(curr), [])
      ],
    })
  }


  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: 'Type de formation: ',
          bold: true,
        }),
        new TextRun({
          text: institutionName,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }

  public createKeyValueInfo(
    key: string,
    value: string
  ): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: key,
          bold: true,
        }),
        new TextRun({
          text: value,
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [
        new TextRun(skills.map((skill) => skill.name).join(', ') + '.'),
      ],
    });
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        })
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split('\n\n');
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText =
      this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const endDateText = isCurrent
      ? 'Present'
      : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sept';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return 'N/A';
    }
  }

  DateTo_dd_MM_YYYY(date : Date | string) : string {
    if(!date) return;

    return this.datePipe.transform(date, 'dd-MM-YYYY');
  }

}
