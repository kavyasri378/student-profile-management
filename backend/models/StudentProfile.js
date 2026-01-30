import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  emergencyContact: {
    name: { type: String, required: true, trim: true },
    relationship: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true }
  }
});

const academicInfoSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  program: {
    type: String,
    required: [true, 'Program is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1, 'Year must be at least 1'],
    max: [6, 'Year cannot exceed 6']
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: [1, 'Semester must be at least 1'],
    max: [12, 'Semester cannot exceed 12']
  },
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be less than 0'],
    max: [10, 'GPA cannot exceed 10']
  },
  enrollmentDate: {
    type: Date,
    required: [true, 'Enrollment date is required']
  },
  expectedGraduationDate: {
    type: Date,
    required: [true, 'Expected graduation date is required']
  },
  academicStatus: {
    type: String,
    enum: ['active', 'on-leave', 'graduated', 'suspended'],
    default: 'active'
  }
});

const feesInfoSchema = new mongoose.Schema({
  tuitionFees: {
    type: Number,
    required: [true, 'Tuition fees are required'],
    min: [0, 'Tuition fees cannot be negative']
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: [0, 'Paid amount cannot be negative']
  },
  dueAmount: {
    type: Number,
    default: 0,
    min: [0, 'Due amount cannot be negative']
  },
  lastPaymentDate: {
    type: Date
  },
  paymentHistory: [{
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    method: { type: String, required: true },
    transactionId: { type: String, required: true }
  }],
  scholarship: {
    type: Number,
    default: 0,
    min: [0, 'Scholarship amount cannot be negative']
  }
});

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    unique: true
  },
  personalInfo: {
    type: personalInfoSchema,
    required: [true, 'Personal information is required']
  },
  academicInfo: {
    type: academicInfoSchema,
    required: [true, 'Academic information is required']
  },
  feesInfo: {
    type: feesInfoSchema,
    required: [true, 'Fees information is required']
  },
  documents: [{
    name: { type: String, required: true },
    type: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    url: { type: String }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate due amount automatically
studentProfileSchema.pre('save', function(next) {
  if (this.feesInfo) {
    this.feesInfo.dueAmount = this.feesInfo.tuitionFees - this.feesInfo.paidAmount - this.feesInfo.scholarship;
  }
  next();
});

// Index for faster queries
studentProfileSchema.index({ 'academicInfo.studentId': 1 });

export default mongoose.model('StudentProfile', studentProfileSchema);
