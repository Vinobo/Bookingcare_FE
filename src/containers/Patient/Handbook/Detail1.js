import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from 'react-router-dom';
// import { LANGUAGES } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
import './scss/Detail.scss';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import five_different from '../../../assets/handBook/105518-tam-soat-benh-doctor-check.png';
import generalHealth from '../../../assets/handBook/110621-kham-tong-quat-doctor-check.png'



class Detail1 extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {

    return (
      <>
        <div>
          <Header search={false} />
        </div>
        <div className='handbook-detail'>
          <div className='flex-menu'>
            <div className='general-container'>
              <ul>
                <li onClick={() => this.returnToHome()}><i className="fas fa-home"></i></li>
                <li>Handbook</li>
              </ul>
            </div>
          </div>
          <div className='general-container grid-content'>
            <div className='content-handbook'>
              <h1>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</h1>
              <h2>Với 5 khác biệt khi tầm soát bệnh tại Doctor Check dưới đây, bạn đọc có thể phần nào tự giải đáp câu hỏi "Có nên khám tổng quát tại Doctor Check hay không?"</h2>
              <div className='detail-ct'>
                <figure>
                  <img src={five_different} alt='handbook-img'></img>
                  <figcaption>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</figcaption>
                </figure>
                <p>Doctor Check là một trong những địa chỉ khám chữa bệnh uy tín và chất lượng nhất ở TPHCM. Bên cạnh hoạt động thăm khám, Trung tâm cũng rất đầu tư vào lĩnh vực khám tổng quát, tầm soát bệnh. Với đội ngũ bác sĩ giàu kinh nghiệm, hệ thống máy móc hiện đại và chi phí hợp lý, Doctor Check đã trở thành lựa chọn của nhiều người dân TPHCM khi cần kiểm tra sức khỏe.</p>
                <p>Trong bài viết này, BookingCare sẽ review khám tổng quát tại đây cũng như giới thiệu đến bạn 5 khác biệt khi tầm soát bệnh tại Doctor Check.</p>
                <span id='0'></span>
                <h2>Giới thiệu chung về Doctor Check</h2>
                <ul>
                  <li>Địa chỉ: 429 Tô Hiến Thành, Phường 14, Quận 10, TPHCM</li>
                  <li>
                    Giờ làm việc:
                    <ul>
                      <li>Thứ 2 - thứ 7: 6h00 - 15h00</li>
                      <li>Chủ nhật: 7h00 - 12h00</li>
                    </ul>
                  </li>
                </ul>
                <p><a href="https://www.doctorcheck.vn/" rel="noreferrer" target='_blank'>Doctor Check</a> là một cơ sở y tế tại TPHCM chuyên về tầm soát bệnh và khám sức khỏe tổng quát. Với tầm nhìn là trở thành địa chỉ tin cậy cho việc tầm soát và chăm sóc sức khỏe của mọi người, Doctor Check chú trọng đầu tư vào cả đội ngũ con người lẫn hệ thống máy móc tiên tiến, hiện đại.</p>
                <span id='1'></span>
                <h2>5 khác biệt khi tầm soát bệnh tại Doctor Check</h2>
                <p>Dưới đây là một số ưu điểm khi tầm soát bệnh tại Doctor Check mà bạn đọc có thể tham khảo trước khi lựa chọn thăm khám tại đây.</p>
                <span id='2'></span>
                <h3>1. Thời gian làm việc từ sớm từ 6h00 - 15h00</h3>
                <p>Một trong những khác biệt nổi bật của Doctor Check so với các phòng khám khác là thời gian hoạt động linh hoạt. Phòng khám mở cửa từ 6h00 sáng đến 15h00 chiều, giúp khách hàng có thể dễ dàng đặt lịch hẹn và tới khám bệnh ngay từ sáng sớm.</p>
                <p>Điều này rất thuận tiện cho những người ở xa, ngoài TPHCM có thể tới và thăm khám trong ngày.</p>
                <span id='3'></span>
                <h3>2. Thời gian khám tổng quát tiêu chuẩn chỉ 60 phút</h3>
                <p>Một trong những lợi ích khi tầm soát bệnh tại Doctor Check là thời gian khám tổng quát được tối ưu hóa. Chỉ trong 60 phút, khách hàng có thể hoàn tất quá trình khám sức khỏe tổng quát. Điều này giúp tiết kiệm thời gian cho những người bận rộn, không có nhiều thời gian.</p>
                <p>Với thời gian khám tổng quát tiêu chuẩn chỉ 60 phút, Doctor Check vừa giúp tiết kiệm thời gian cho bệnh nhân mà vẫn đảm bảo chất lượng thăm khám, dịch vụ.</p>
                <figure>
                  <img src={generalHealth} alt='handbook-img'></img>
                  <figcaption>Khách hàng khám tổng quát tại Doctor Check</figcaption>
                </figure>
                <span id='4'></span>
                <h3>3. Đội ngũ bác sĩ đến từ các Bệnh viện đầu ngành tại TPHCM</h3>
                <p>Trung tâ Doctor Check quy đội ngũ bác sĩ từ các Bệnh viện đầu ngành tại TPHCM, có trình độ chuyên môn cao và giàu kinh nghiệm trong lĩnh vực y tế. Tiêu biểu như:</p>
                <ul>
                  <li>ThS.BS CKI Lưu Ngọc Mai: Bác sĩ nội tổng quát, Bệnh viện Đại học Y dược TPHCM</li>
                  <li>ThS.BSNT Thái Việt Nguyên: Bác sĩ nội tổng quát, Bệnh viện Nguyễn Tri Phương</li>
                  <li>ThS.BS CKI Nguyễn Ngọc Quỳnh Dung: Bác sĩ nội tổng quát, Bệnh viện Thống Nhất</li>
                  <li>BS CKI Đặng Nguyễn Nhật Thanh Thi: Bác sĩ nội soi, Bệnh viện Thống Nhất</li>
                </ul>
                <span id='5'></span>
                <h3>4. Hệ thống máy móc đầy đủ, hiện đại</h3>
                <p>Doctor Check đầu tư mạnh vào công nghệ và thiết bị y tế hiện đại để đảm bảo tầm soát bệnh chính xác và hiệu quả. Trung tâm sở hữu hệ thống máy móc tiên tiến giúp cho quá trình khám và chẩn đoán được diễn ra nhanh chóng và chính xác.</p>
                <ul>
                  <li>Máy siêu âm màu Acuson Juniper - Siemens Mỹ</li>
                  <li>Máy điện tim 3 kênh FX 8100 - Fukuda Nhật Bản</li>
                  <li>Hệ thống chụp X-quang kỹ thuật số đến từ hãng Vikomed</li>
                  <li>Hệ thống máy xét nghiệm: huyết học, sinh hóa miễn dịch</li>
                </ul>
                <span id='6'></span>
                <h3>5. Chi phí rõ ràng, công khai, minh bạch</h3>
                <p>Doctor Check luôn công khai và minh bạch về chi phí dịch vụ. Trước khi tiến hành bất kỳ dịch vụ nào, Doctor Check sẽ cung cấp cho khách hàng thông tin chi tiết về các khoản phí liên quan. </p>
                <p>Chi tiết chi phí các gói tầm soát bệnh, khám tổng quát cũng được Doctor Check công khai trên website phòng khám, bạn đọc quan tâm có thể tham khảo. Dưới đây là chi phí một số gói khám nổi bật tại Doctor Check mà bạn đọc có thể tham khảo:</p>
                <ul>
                  <li>Gói khám tổng quát dành cho nữ:
                    <ul>
                      <li>Gói tiêu chuẩn - 17 chỉ số:&nbsp;560,000đ</li>
                      <li>Gói chuyên sâu - 27 chỉ số:&nbsp;1,525,000đ</li>
                      <li>Gói VIP - 34 chỉ số:&nbsp;2,180,000đ</li>
                    </ul>
                  </li>
                  <li>Gói khám tổng quát dành cho nam:
                    <ul>
                      <li>Gói khám tiêu chuẩn - 17 chỉ số:&nbsp;560,000đ</li>
                      <li>Gói khám chuyên sâu - 25 chỉ số:&nbsp;1,225,000đ</li>
                      <li>Gói khám VIP - 32 chỉ số:&nbsp;1,840,000đ</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className='table-content'>
              <div className='title-tbct'>Nội dung chính</div>
              <div className='tb-of-content'>
                <ul>
                  <li><a href='#0'>Giới thiệu chung về Doctor Check</a></li>
                  <li><a href='#1' >5 khác biệt khi tầm soát bệnh tại Doctor Check</a></li>
                  <li><a href='#2'>1. Thời gian làm việc từ sớm từ 6h00 - 15h00</a></li>
                  <li><a href='#3'>2. Thời gian khám tổng quát tiêu chuẩn chỉ 60 phút</a></li>
                  <li><a href='#4'>3. Đội ngũ bác sĩ đến từ các Bệnh viện đầu ngành tại TPHCM</a></li>
                  <li><a href='#5'>4. Hệ thống máy móc đầy đủ, hiện đại</a></li>
                  <li><a href='#6'>5. Chi phí rõ ràng, công khai, minh bạch</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <About />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail1);
