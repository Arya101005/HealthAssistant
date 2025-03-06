import { UserHealthProfile } from '../types/health';

export const initialHealthProfile: UserHealthProfile = {
  id: '1',
  name: 'John Doe',
  age: 30,
  height: 175,
  weight: 70,
  gender: 'male',
  metrics: {
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      timestamp: new Date().toISOString(),
    },
    bloodSugar: {
      value: 95,
      type: 'fasting',
      timestamp: new Date().toISOString(),
    },
    cholesterol: {
      totalCholesterol: 180,
      hdl: 50,
      ldl: 110,
      triglycerides: 150,
      timestamp: new Date().toISOString(),
    },
    activity: {
      steps: 8000,
      activeMinutes: 45,
      caloriesBurned: 400,
      timestamp: new Date().toISOString(),
    },
    sleep: {
      duration: 7.5,
      quality: 85,
      timestamp: new Date().toISOString(),
    },
    heartRate: {
      current: 72,
      resting: 65,
      timestamp: new Date().toISOString(),
    },
    diet: [],
    timestamp: new Date().toISOString()
  },
  goals: {
    steps: 10000,
    activeMinutes: 60,
    calories: 2000,
    sleep: 8
  },
  medicalConditions: [],
  medications: [],
  allergies: [],
  dietLogs: [
    {
      mealType: 'breakfast',
      items: [
        {
          name: 'Oatmeal with berries',
          calories: 350,
          nutrients: {
            protein: 12,
            carbs: 45,
            fats: 8,
          },
        },
      ],
      timestamp: new Date().toISOString(),
    },
  ],
  riskScores: {
    overall: 85,
    categories: {
      diabetes: 15,
      heartDisease: 20,
      stroke: 18,
      hypertension: 25,
    },
    lastUpdated: new Date().toISOString(),
  },
  recommendations: [
    {
      type: 'exercise',
      priority: 'high',
      title: 'Increase Daily Steps',
      description: 'Try to reach 10,000 steps daily to improve cardiovascular health.',
      impact: 'Reduces heart disease risk by 30%',
      tasks: [
        {
          id: 'task1',
          title: 'Take a 15-minute walk after each meal',
          description: 'Walking after meals helps with digestion and blood sugar control',
          points: 10,
          difficulty: 'easy',
          category: 'exercise',
          completed: false
        },
        {
          id: 'task2',
          title: 'Use stairs instead of elevator',
          description: 'Taking stairs burns more calories and strengthens leg muscles',
          points: 15,
          difficulty: 'medium',
          category: 'exercise',
          completed: false
        },
        {
          id: 'task3',
          title: 'Park farther from destinations',
          description: 'This simple change adds more steps to your daily routine',
          points: 5,
          difficulty: 'easy',
          category: 'exercise',
          completed: false
        }
      ],
      potential_points: 30
    },
    {
      type: 'diet',
      priority: 'medium',
      title: 'Reduce Sodium Intake',
      description: 'Your sodium intake is slightly above recommended levels.',
      impact: 'Helps maintain healthy blood pressure',
      tasks: [
        {
          id: 'task4',
          title: 'Choose low-sodium alternatives',
          description: 'Look for low-sodium options when shopping',
          points: 10,
          difficulty: 'easy',
          category: 'diet',
          completed: false
        },
        {
          id: 'task5',
          title: 'Cook meals at home more often',
          description: 'Home-cooked meals give you better control over sodium content',
          points: 20,
          difficulty: 'medium',
          category: 'diet',
          completed: false
        },
        {
          id: 'task6',
          title: 'Read nutrition labels carefully',
          description: 'Check sodium content on all packaged foods',
          points: 5,
          difficulty: 'easy',
          category: 'diet',
          completed: false
        }
      ],
      potential_points: 35
    }
  ],
}; 