import type { TypeTrainingYear } from '@renderer/data/TrainingYears'
import { TypeTrainingData } from '@renderer/type/trainings'
import { dataMock } from '@renderer/data/_data'

class MyTrainingData {
  get(): TypeTrainingData {
    return dataMock;
  }

  tasks(): TypeTrainingData {
    return this.get();
  }

  getTotalMinutes (categoryList, yearFilter: TypeTrainingYear = 0): number {
    const tasks = this.tasks();
    const cats = Array.isArray(categoryList) ? categoryList : [categoryList];
    return cats.reduce((total, cat) => {
      const taskList = tasks[cat] || [];
      return total + taskList.reduce((catTotal, task) => {
        if (yearFilter !== 0 && task.year !== parseInt(yearFilter.toString())) {
          return catTotal;
        }
        return catTotal + (task?.completed ? (task.totalMinutes || 0) : 0);
      }, 0);
    }, 0);
  }

  getTotalHours(categoryList, yearFilter: TypeTrainingYear = 0): number {
    return Math.floor(this.getTotalMinutes(categoryList, yearFilter) / 60);
  }

  // 총 수련시간 계산 (초기화된 상태)
  getTotalTrainingHours (activeYear: TypeTrainingYear = 0): number {
    const tasks = this.tasks();
    const allMinutes = Object.keys(tasks).reduce((total, category) => {
      return total + this.getTotalMinutes([category], activeYear);
    }, 0);
    return Math.floor(allMinutes / 60);
  };

  calculateRequirement(){
    const tasks = this.tasks();
    const assessmentData = this.getTotalMinutes(['psychological_assessment']);
    const therapyData = this.getTotalMinutes(['individual_therapy', 'group_therapy']);
    // const therapyParticipationData = this.getTotalMinutes(['therapy_participation']);
    const academicData = this.getTotalMinutes(['academic_meeting_attendance']);
    const caseData = this.getTotalMinutes(['case_meeting_attendance']);
    const ethicsData = tasks.ethics_education_attendance.length;
    const presentationData = this.getTotalMinutes(['case_presentation_substitute']);
    const paperData = tasks.research_activity.length;
    const externalData = this.getTotalMinutes(['external_cooperation']);

    const comprehensiveCount = tasks.psychological_assessment.filter(task =>
      task.evaluationType === 'comprehensive' || (task.evaluationType === 'mixed' && task.details.includes('종합평가'))
    ).length;

    const mainTherapistData = tasks.individual_therapy.filter(task => task.isMainTherapist);
    const mainTherapistHours = Math.floor(mainTherapistData.reduce((total, task) => total + task.totalMinutes, 0) / 60);
    const mainTherapistCases = mainTherapistData.filter(task => (task.sessions ?? 0) >= 3).length;

    return {
      assessment: {
        totalHours: Math.floor(assessmentData / 60),
        totalHoursStatus: assessmentData >= 18000 ? 'completed' : 'in_progress', // 300시간
        comprehensiveCount: comprehensiveCount,
        comprehensiveStatus: comprehensiveCount >= 30 ? 'completed' : 'in_progress'
      },
      therapy: {
        totalHours: Math.floor(therapyData / 60),
        totalHoursStatus: therapyData >= 18000 ? 'completed' : 'in_progress', // 300시간
        mainTherapistHours: mainTherapistHours,
        mainTherapistHoursStatus: mainTherapistHours >= 100 ? 'completed' : 'in_progress',
        mainTherapistCases: mainTherapistCases,
        mainTherapistCasesStatus: mainTherapistCases >= 10 ? 'completed' : 'in_progress'
      },
      attendance: {
        academicHours: Math.floor(academicData / 60),
        academicStatus: academicData >= 1800 ? 'completed' : 'in_progress', // 30시간
        caseHours: Math.floor(caseData / 60),
        caseStatus: caseData >= 600 ? 'completed' : 'in_progress', // 10시간
        ethicsCount: ethicsData,
        ethicsStatus: ethicsData >= 1 ? 'completed' : 'required'
      },
      presentation: {
        validCasePresentation: 0,
        validAcademicPresentation: 0,
        validCasePresentationStatus: 'required',
        validAlternativeStatus: 'required',
        totalHours: Math.floor(presentationData / 60),
        totalHoursStatus: presentationData >= 240 ? 'completed' : 'required' // 4시간
      },
      research: {
        paperCount: paperData,
        paperStatus: paperData >= 1 ? 'completed' : 'required',
        externalHours: Math.floor(externalData / 60),
        externalStatus: externalData >= 1800 ? 'completed' : 'in_progress' // 30시간
      }
    }
  }
}

export default new MyTrainingData();
