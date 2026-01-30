import StudentProfile from '../models/StudentProfile.js';
import User from '../models/User.js';

// Get student profile data
const getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    
    // First try to find existing student profile
    let studentProfile = await StudentProfile.findOne({ userId });
    
    // If no profile exists, create one with basic info from user
    if (!studentProfile) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Create basic student profile
      studentProfile = new StudentProfile({
        userId,
        name: user.name,
        email: user.email,
        studentId: `STU${Date.now().toString().slice(-6)}`,
        department: 'Computer Science',
        semester: '1st Semester',
        batch: new Date().getFullYear().toString(),
        cgpa: '0.0',
        phone: '',
        address: '',
        dateOfBirth: '',
        totalFees: 45000,
        feesPaid: 0,
        feesRemaining: 45000,
        lastPayment: null,
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      
      await studentProfile.save();
    }
    
    res.status(200).json({
      success: true,
      data: studentProfile
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student profile'
    });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const updateData = req.body;
    
    let studentProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true, upsert: true }
    );
    
    res.status(200).json({
      success: true,
      data: studentProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student profile'
    });
  }
};

// Get all students (for admin)
const getAllStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find().populate('userId', 'name email role');
    
    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Error fetching all students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students'
    });
  }
};

export {
  getStudentProfile,
  updateStudentProfile,
  getAllStudents
};
