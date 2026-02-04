import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Injectable({
  providedIn: 'root'
})
export class YoungFormService {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb

  constructor(private fb : FormBuilder) { }

  healthIssueForm(){
    return this.fb.group({
      status: [false, []],
      chronic_illness: ['', []],
      ongoing_treatment: ['', []],
    });
  }

  addictionForm(){
    return this.fb.group({
      status: [false, []],
      description: ['', []],
    });
  }

  handicapForm(){
    return this.fb.group({
      status: [false, []],
      description: ['', []],
    });
  }

  physicalStateForm(){
    return this.fb.group({
      addiction: this.addictionForm(),
      handicap: this.handicapForm(),
      health_issue: this.healthIssueForm(),
    });
  }

  PersonalInfoForm(){
    return this.fb.group({
      fullname: ['', [Validators.required]],
      address: ['', []],
      city: ['', []],
      gendre: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      inscription_date: ['', [Validators.required]],
      photo: ['', FileValidator.maxContentSize(this.PHOTO_MAX_SIZE)],
      phone: ['', []],
      cin_id: ['', []],
      cnss_id: ['', []],
      civil_status: ['', []],
      kids_nbr: [0, []],
      housing: ['', []],
      people_in_charge_nbr: [0, []],
      current_function: ['', []],
      associative_activity: ['', []],
      hobbies: [[], []],
      connectedBy: ['', []],
      isPriority: [false, []],
      physical_state: this.physicalStateForm(),
      nationality : ['Marocaine', [Validators.required]],
      nationality_comment : ['', []]
    });
  }

  levelOfStudyForm(){
    return this.fb.group({
      level: ['', []],
      description: ['', []]
    });  
  }

  professionalTrainingForm(){
    return this.fb.group({
      type_formation : ['', []],
      specialty: ['', []],
      institution: ['', []],
      start_date: ['', []],
      end_date: ['', []],
      cetificate: ['', []],
      comment: ['', []],
    });
  }
  
  professionalExperienceForm(){
    return this.fb.group({
      genre: ['', []],
      institution: ['', []],
      start_date: ['', []],
      end_date: ['', []],
      duration: ['', []],
      function: ['', []],
      comment: ['', []],
    });  
  }

  tipInterviewForm(){
    return this.fb.group({
      date: ['', []],
      comment: ['', []],
    });
  }

  skillsForm(){
    return this.fb.group({
      hard_skills: [[], []],
      soft_skills: [[], []],
      life_skills: [[], []],
    });
  }

  skillsAssessmentForm(){
    return this.fb.group({
        level_of_study: this.levelOfStudyForm(),
        languages: [[], []],
        languages_comment: ['', []],
        professional_training:  this.fb.array([this.professionalTrainingForm()]),
        professional_experience: this.fb.array([this.professionalExperienceForm()]),
        tip_interview: this.tipInterviewForm(),
        skills: this.skillsForm(),
      });
  }

  capacityBuildingTrainingForm(){
    return this.fb.group({
      title: ['', []],
      start_date: ['', []],
      status: ['', []],
    });
  }

  capacityBuildingForm(){
    return this.fb.group({
      training: this.fb.array([this.capacityBuildingTrainingForm()]),
      comment: ['', []]
    });
  }

  passworkTrainingForm(){
    return  this.fb.group({
      passwork_training: [null, []],
      start_date: ['', []],
      end_date: ['', []],
      comment: ['', []],
    });
  }

  passworkForm(){
    return this.fb.group({
      trainings : this.fb.array([this.passworkTrainingForm()])
    });
  }

  trackingBeforeForm(){
    return this.fb.group({
      interview_date: ['', []],
      companyId: [null, []],
      companyName: ['', []],
      job_position: ['', []],
      comment: ['', []],
    });
  }

  trackingAfterForm(){
    return this.fb.group({
      contract_type: ['', []],
      companyId: [null, []],
      companyName: ['', []],
      isJobExists: [false, []],
      jobId: [null, []],
      jobName: ['', []],
      insertion_type: ['direct', []],
      start_date: ['', []],
      end_date: ['', []],
      category: ['', []],
      function_type: ['', []],
      duration: ['', []],
      cnss: [false, []],
      salary: ['', []],
      function: ['', []],
      justificative_type: ['', []],
      justification: ['', []],
    });
  }

  trackingAfterFormAdd(){
    return this.fb.group({
      contract_type: ['', [Validators.required]],
      companyId: [null, []],
      companyName: ['', []],
      isJobExists: [false, []],
      jobId: [null, []],
      jobName: ['', []],
      insertion_type: ['direct', [Validators.required]],
      start_date: ['', []],
      end_date: ['', []],
      category: ['', [Validators.required]],
      function_type: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      cnss: [false, [Validators.required]],
      salary: ['', [Validators.required]],
      function: ['', []],
      justificative_type: ['', [Validators.required]],
      justification: ['', [Validators.required]],
    });
  }

  trackingsForm(){
    return this.fb.group({
      tracking_before: this.fb.array([this.trackingBeforeForm()]),
      tracking_after: this.trackingAfterForm()
    });
  }

  trackingsFormAdd(){
    return this.fb.group({
      tracking_before: this.fb.array([this.trackingBeforeForm()]),
      tracking_after: this.trackingAfterFormAdd()
    });
  }

  insertionForm(){
    return this.fb.group({
      list : this.fb.array([this.trackingsForm()])
    });
  }

  trackingAfterEditForm(){
    return this.fb.group({
      contract_type: ['', [Validators.required]],
      companyId: [null, []],
      companyName: ['', []],
      isJobExists: [false, []],
      jobId: [null, []],
      jobName: ['', []],
      insertion_type: ['direct', [Validators.required]],
      start_date: ['', []],
      end_date: ['', []],
      category: ['', [Validators.required]],
      function_type: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      cnss: [false, [Validators.required]],
      salary: ['', [Validators.required]],
      function: ['', []],
      justificative_type: ['', [Validators.required]],
      justification: ['', [Validators.required]],
    });
  }

  trackingsEditForm(){
    return this.fb.group({
      tracking_before: this.fb.array([this.trackingBeforeForm()]),
      tracking_after: this.trackingAfterEditForm()
    });
  }

  insertionEditForm(){
    return this.fb.group({
      list : this.fb.array([this.trackingsEditForm()])
    });
  }

  PersonalInfoUpdateForm(){
    return this.fb.group({
      fullname: ['', [Validators.required]],
      address: ['', []],
      city: ['', []],
      gendre: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      inscription_date: ['', [Validators.required]],
      phone: ['', []],
      cin_id: ['', []],
      cnss_id: ['', []],
      civil_status: ['', []],
      kids_nbr: [0, []],
      housing: ['', []],
      people_in_charge_nbr: [0, []],
      current_function: ['', []],
      associative_activity: ['', []],
      hobbies: [[], []],
      nationality : ['', [Validators.required]],
      nationality_comment : ['', []],
      connectedBy: ['', []],
      isPriority: [false, []],
      physical_state: this.physicalStateForm(),
    });
  }
}
