/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    nameTitleTha: "",
    firstnameTha: "",
    lastnameTha: "",
    nameTitleEng: "",
    firstnameEng: "",
    lastnameEng: "",
    birthDate: "",
    birthMonth: "",
    birthYear: "",
    idCard: "",
    password: "",
    mobile: "",
    email: "",
    acceptTerms: false, // เพิ่มค่า acceptTerms เริ่มต้นเป็น false
  });

  const [errors, setErrors] = useState({
    firstnameThaError: "",
    firstnameEngError: "",
    idCardError: "",
    passwordError: "",
    emailError: "",
    acceptTermsError: "", // เพิ่มข้อผิดพลาดสำหรับการยอมรับเงื่อนไข
    mobileError: "", // เพิ่มข้อผิดพลาดสำหรับเบอร์โทรศัพท์
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // เพิ่มเงื่อนไขเฉพาะตัวเลขเมื่อชนิดข้อมูลเป็น text และชื่อฟิลด์คือ idCard
    if (type === "text" && name === "idCard") {
      // ใช้เฉพาะเลข 0-9 และจำกัดความยาวเป็น 13 หลัก
      const numericValue = value.replace(/\D/, "").substring(0, 13);
      setFormData({ ...formData, [name]: numericValue });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // เพิ่มเงื่อนไขตรวจสอบภาษาที่ใช้ในการกรอกข้อมูล
  if (name.includes("Tha") && !value.match(/^[\u0E01-\u0E5B]+$/)) {
    setErrors({
      ...errors,
      [`${name}Error`]: "กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น",
    });
  } else if (name.includes("Eng") && !value.match(/^[A-Za-z\s]+$/)) {
    setErrors({
      ...errors,
      [`${name}Error`]: "กรุณากรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น",
    });
  } else {
    validateForm(name, value); // เรียกฟังก์ชัน validateForm เพื่อตรวจสอบข้อมูล
  }
};

  const validateForm = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case "firstnameTha":
        newErrors.firstnameThaError = value.match(/^[\u0E01-\u0E5B]+$/)
          ? ""
          : "กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น";
        break;
      case "firstnameEng":
        newErrors.firstnameEngError = value.match(/^[A-Za-z\s]+$/)
          ? ""
          : "กรุณากรอกชื่อเป็นภาษาอังกฤษเท่านั้น";
        break;
      case "idCard":
        newErrors.idCardError = value.match(/^\d{13}$/)
          ? ""
          : "กรุณากรอกเลขบัตรประชาชน 13 ตัวเท่านั้น";
        break;
      case "password":
        newErrors.passwordError =
          value.length >= 8 ? "" : "กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว";
        break;
      case "mobile":
        newErrors.mobileError = value.match(/^\d{10}$/)
          ? ""
          : "กรุณากรอกเบอร์มือถือ 10 ตัวเท่านั้น";
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    let newErrors = { ...errors };

    // เพิ่มการตรวจสอบ mobileError
    if (newErrors.mobileError !== "") {
      newErrors.mobileError = "กรุณากรอกข้อมูลให้ถูกต้อง";
    }

    // Check if password has at least 8 characters
    if (formData.password.length < 8) {
      newErrors.passwordError = "กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว";
    }

    // Check for any errors in the form
    for (const key in errors) {
      if (errors[key] !== "") {
        newErrors.acceptTermsError = "กรุณากรอกข้อมูลให้ถูกต้อง";
        break;
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      alert("ลงทะเบียนสำเร็จ");
    } else {
      alert("กรุณากรอกข้อมูลให้ถูกต้อง");
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1); // วันที่ 1-31
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ]; // เดือน
  const currentYear = new Date().getFullYear(); // ปีปัจจุบัน (ค.ศ.)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // ปี (พ.ศ.)

  return (
    <section className="container mt-4">
      <div className="mb-4">
        <div className="card border-0 shadow p-4">
          <h5 className="fw-bolder mb-3">ข้อมูลทั่วไป</h5>
          <div className="rounded border p-4">
            <div className="row">
              {/* ส่วนของชื่อ-สกุล ภาษาไทย */}
              <div className="col-lg-2 mb-3">
                <label htmlFor="nameTitleTha" className="form-label">
                  คำนำหน้า <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="nameTitleTha"
                  id="nameTitleTha"
                  onChange={handleChange}
                  value={formData.nameTitleTha}
                  required=""
                >
                  
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
                <div className="invalid-feedback">กรุณาเลือกคำนำหน้า</div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="firstnameTha" className="form-label">
                  ชื่อ ภาษาไทย <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstnameThaError && "is-invalid"
                  }`}
                  name="firstnameTha"
                  id="firstnameTha"
                  onChange={handleChange}
                  value={formData.firstnameTha}
                  required=""
                />
                <div className="invalid-feedback">
                  {errors.firstnameThaError}
                </div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="lastnameTha" className="form-label">
                  นามสกุล ภาษาไทย <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastnameTha"
                  id="lastnameTha"
                  onChange={handleChange}
                  value={formData.lastnameTha}
                  required=""
                />
              </div>
            </div>
            {/* ส่วนของชื่อ-สกุล ภาษาอังกฤษ */}
            <div className="row">
              <div className="col-lg-2 mb-3">
                <label htmlFor="nameTitleEng" className="form-label">
                  คำนำหน้า <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="nameTitleEng"
                  id="nameTitleEng"
                  onChange={handleChange}
                  value={formData.nameTitleEng}
                  required=""
                >
                 
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </select>
                <div className="invalid-feedback">กรุณาเลือกคำนำหน้า</div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="firstnameEng" className="form-label">
                  ชื่อ ภาษาอังกฤษ <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstnameEngError && "is-invalid"
                  }`}
                  name="firstnameEng"
                  id="firstnameEng"
                  onChange={handleChange}
                  value={formData.firstnameEng}
                  required=""
                />
                <div className="invalid-feedback">
                  {errors.firstnameEngError}
                </div>
              </div>
              <div className="col-lg-5 mb-3">
                <label htmlFor="lastnameEng" className="form-label">
                  นามสกุล ภาษาอังกฤษ <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastnameEng"
                  id="lastnameEng"
                  onChange={handleChange}
                  value={formData.lastnameEng}
                  required=""
                />
                <div className="invalid-feedback">
                  กรุณากรอกนามสกุล ภาษาอังกฤษ
                </div>
              </div>
            </div>
            {/* ส่วนของวันเกิด */}
            <div className="row">
              <div className="col-lg-3 mb-3">
                <label htmlFor="birthDate" className="form-label">
                  วันเกิด <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select text-center"
                  name="birthDate"
                  id="birthDate"
                  onChange={handleChange}
                  value={formData.birthDate}
                  required=""
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">กรุณาเลือกวันเกิด</div>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="birthMonth" className="form-label">
                  เดือน <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select text-center"
                  name="birthMonth"
                  id="birthMonth"
                  onChange={handleChange}
                  value={formData.birthMonth}
                  required=""
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">กรุณาเลือกเดือนเกิด</div>
              </div>
              <div className="col-lg-3 mb-3">
                <label htmlFor="birthYear" className="form-label">
                  ปี (พ.ศ.) <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select text-center"
                  name="birthYear"
                  id="birthYear"
                  onChange={handleChange}
                  value={formData.birthYear}
                  required=""
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">กรุณาเลือกปีเกิด (พ.ศ.)</div>
              </div>
            </div>
            {/* ส่วนของหมายเลขบัตรประชาชน */}
            <div className="mb-3">
              <label htmlFor="idCard" className="form-label">
                หมายเลขบัตรประชาชน <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control text-center ${
                  errors.idCardError && "is-invalid"
                }`}
                name="idCard"
                id="idCard"
                value={formData.idCard}
                onChange={handleChange}
                required=""
                placeholder="ไม่ต้องใส่อักขระขีดและเว้นวรรค"
              />
              <div className="invalid-feedback">{errors.idCardError}</div>
            </div>
          </div>
          {/* ส่วนของรหัสผ่าน */}
          <h5 className="fw-bolder mt-5 mb-3">สร้างรหัสผ่าน</h5>
          <div className="rounded border p-4">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                รหัสผ่าน สำหรับเข้าใช้งาน <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.passwordError && "is-invalid"
                }`}
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                required=""
                placeholder="a-z, A-Z, 0-9, 8 อักขระขึ้นไป"
              />
              <div className="invalid-feedback">{errors.passwordError}</div>
            </div>
          </div>
          {/* ส่วนของข้อมูลติดต่อ */}
          <h5 className="fw-bolder mt-5 mb-3">ข้อมูลติดต่อ</h5>
          <div className="rounded border p-4">
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                เบอร์มือถือ <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.mobileError && "is-invalid"}`}
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required=""
                maxLength="10"
                placeholder="เบอร์มือถือ 10 ตัว"
              />
              <div className="invalid-feedback">{errors.mobileError}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                อีเมล <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.emailError && "is-invalid"}`}
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required=""
                placeholder="@webmail.npru.ac.th"
              />
              <div className="invalid-feedback">{errors.emailError}</div>
            </div>
          </div>
          {/* ส่วนของการยอมรับเงื่อนไข */}
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              onChange={handleChange}
              checked={formData.acceptTerms}
            />
            <label className="form-check-label" htmlFor="acceptTerms">
              ข้าพเจ้ายอมรับว่าข้อมูลข้างต้นเป็นข้อมูลจริงของข้าพเจ้า
              เพื่อใช้สำหรับลงทะเบียนหลักสูตรระยะสั้น
              ของคณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏนครปฐม
            </label>
          </div>
          <div className="text-danger">{errors.acceptTermsError}</div>
          {/* ปุ่มยืนยัน */}
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              ลงทะเบียน
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupForm;
