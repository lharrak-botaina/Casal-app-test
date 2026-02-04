import {
  CVPersonalInfo,
  CVEducation,
  CVExperience,
  CVSkills,
  CVLevelOfStudy,
} from './../core/models/young_cv';
import { DocumentCreatorService } from './../core/services/document-creator.service';
import { Component, OnInit } from '@angular/core';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { YoungService } from '../core/services/young.service';
import { ActivatedRoute } from '@angular/router';
import { LevelOfStudy, Young } from '../core/models/young';
import { catchError, first, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cv-generator',
  templateUrl: './cv-generator.component.html',
  styleUrls: ['./cv-generator.component.scss'],
})
export class CvGeneratorComponent implements OnInit {
  young: Young = !window?.history?.state?._id ? null : window?.history?.state;

  host = environment.YOUNG_PHOTO_HOST;

  personalInfo: CVPersonalInfo;
  photoBuffer: ArrayBuffer;
  levelOfStudy: CVLevelOfStudy;
  educations: CVEducation[] = [];
  experiences: CVExperience[] = [];
  skills: CVSkills[] = [];
  languages: string[] = [];
  hobbies: string[] = [];
  hard_skills: string[] = [];
  soft_skills: string[] = [];
  life_skills: string[] = [];
  selected_hard_skills: string[] = [];
  selected_soft_skills: string[] = [];
  selected_life_skills: string[] = [];
  selected = false;
  withPhoto = true;

  constructor(
    private documentCreator: DocumentCreatorService,
    private youngService: YoungService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.young)
      this.loadYoung(this.activatedRoute?.snapshot?.paramMap?.get('id'));
    else {
      this.setPhotoAsBuffer();
      this.initSkills();
      this.initData();
    }
  }

  onSelectEducation(education: CVEducation) {
    education.selected = !education.selected;
  }

  onSelectExperience(experience: CVExperience) {
    experience.selected = !experience.selected;
  }

  loadYoung(id) {
    this.youngService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (young) => (this.young = young),
        }),
        tap((young) => {
          this.setPhotoAsBuffer();
          this.initSkills();
          this.initData();
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe();
  }

  initData() {
    this.personalInfo = this.setPersonalInfo();
    this.levelOfStudy = this.setLevelOfStudy();
    this.educations = this.setEducations();
    this.experiences = this.setExperiences();
    this.languages = this.setLanguages();
    this.hobbies = this.setHobbies();
  }

  initSkills() {
    this.selected_hard_skills = this.hard_skills =
      this.young?.skills_assessment?.skills?.hard_skills;
    this.selected_soft_skills = this.soft_skills =
      this.young?.skills_assessment?.skills?.soft_skills;
    this.selected_life_skills = this.life_skills =
      this.young?.skills_assessment?.skills?.life_skills;
  }

  download(): void {
    const doc = this.documentCreator.create(
      this.personalInfo,
      this.preparePhotoBuffer(),
      this.levelOfStudy,
      this.perpareEducations(),
      this.perpareExperiences(),
      this.prepareSkills(),
      this.languages,
      this.hobbies
    );

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${this.young?.personal_info?.fullname}.docx`);
    });
  }

  preparePhotoBuffer() {
    if (!this.withPhoto) return null;

    return this.photoBuffer;
  }

  perpareExperiences() {
    return this.experiences.filter((experience) => experience.selected);
  }

  perpareEducations() {
    return this.educations.filter((education) => education.selected);
  }

  prepareSkills(): CVSkills[] {
    let skills: CVSkills[] = [];

    skills.push({
      title: 'Compétences techniques: ',
      value: this.selected_hard_skills?.toString(),
    });
    skills.push({
      title: 'Compétences relationnelles: ',
      value: this.selected_soft_skills?.toString(),
    });
    skills.push({
      title: 'Compétences essentielles: ',
      value: this.selected_life_skills?.toString(),
    });

    return skills;
  }

  setPersonalInfo(): CVPersonalInfo {
    let { fullname, address, city, birth_date, phone } =
      this.young?.personal_info;

    return { fullname, address, city, birth_date, phone };
  }
  
  setLevelOfStudy(): CVLevelOfStudy {
    const { level } = this.young?.skills_assessment.level_of_study;

    return { level };
  }

  setPhotoAsBuffer() {
    if (!this.young?.personal_info?.photo) return null;

    fetch(this.host + this.young?.personal_info?.photo).then((res) => {
      const bufferPromise = res.arrayBuffer();
      bufferPromise.then((buffer) => {
        this.photoBuffer = buffer;
      });
    });
  }

  setEducations(): CVEducation[] {
    return this.young?.skills_assessment?.professional_training.map((pt) => ({
      ...pt,
      selected: true,
    }));
  }

  setExperiences(): CVExperience[] {
    return this.young?.skills_assessment?.professional_experience.map((pe) => ({
      ...pe,
      selected: true,
    }));
  }

  setLanguages(): string[] {
    return this.young?.skills_assessment?.languages;
  }

  setHobbies(): string[] {
    return this.young?.personal_info?.hobbies;
  }
}
