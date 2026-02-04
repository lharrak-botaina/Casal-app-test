export interface CVPersonalInfo {
  fullname: string;
  address: string;
  city: string;
  birth_date: Date;
  phone: string;
}

export interface CVLevelOfStudy {
  level: string;
  selected? : boolean;
}

export interface CVEducation {
  type_formation: string;
  specialty: string;
  institution: string;
  start_date: string;
  end_date: string;
  cetificate: string;
  selected : boolean;
  comment: string;
}

export interface CVExperience {
    genre: string;
    institution: string;
    start_date: string;
    end_date: string;
    duration: string;
    function: string;
    comment: string;
    selected : boolean;
}

export interface CVSkills {
    title: string;
    value: string;
}
