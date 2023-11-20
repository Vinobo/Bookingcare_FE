import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './scss/Detail.scss';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import five_different from '../../../assets/handBook/105518-tam-soat-benh-doctor-check.png';
import HOSP115Register from '../../../assets/handBook/174114bv-115-register.jpg';
import HOSP115 from '../../../assets/handBook/160418-bv-nhan-dan-115-ggrv-min.png';
import HOSP115Map from '../../../assets/handBook/100052bv-115-so-do.jpg';
import HOSP115Gate from '../../../assets/handBook/174114bv-115-gate.jpg';

class Detail5 extends Component {

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
          <Header />
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
              <h1>Kinh nghiệm thực tế đi khám tại Bệnh viện Nhân dân 115</h1>
              <h2>Bệnh viện Nhân dân 115 đón tiếp hàng nghìn lượt bệnh nhân đăng kí khám mỗi ngày. Những thông tin về kinh nghiệm khám chữa bệnh tại Bệnh viện 115 sẽ giúp người đi khám chủ động và chuẩn bị tốt cho quá trình đi khám.</h2>
              <div className='detail-ct'>
                <figure>
                  <img src={HOSP115}></img>
                  <figcaption>Cổng số 1 lối vào Bệnh viện Nhân dân 115</figcaption>
                </figure>
                <p>Bệnh viện Nhân dân 115 là bệnh viện đa khoa hạng I thuộc Sở Y tế TP.HCM. Bệnh viện đang triển khai nhiều dịch vụ khám khác nhau để phù hợp với từng bệnh nhân.</p>
                <p>Trong bài viết này, BookingCare sẽ cung cấp chi tiết thông tin về các dịch vụ khám tại Bệnh viện Nhân dân 115 và một số lưu ý khi đi khám tại đây.</p>

                <span id='0'></span>
                <h2>Bệnh viện Nhân dân 115 ở đâu?</h2>
                <p>Cổng chính của Bệnh viện Nhân dân 115 tọa lạc tại đường Sư Vạn Hạnh. Tuy nhiên, để đi đến khoa Khám bệnh của Bệnh viện Nhân dân 115, người đi khám đến cổng số 3 (đường Thành Thái). Cụ thể địa chỉ như sau:</p>
                <h3>Cổng chính Bệnh viện Nhân dân 115 (cổng số 3, khu chính)</h3>
                <ul>
                  <li>Số 527 Sư Vạn Hạnh, Quận 10, TP.HCM</li>
                </ul>
                <h3>Khoa Khám bệnh (khu E, khám thường)</h3>
                <ul>
                  <li>Số 88 Thành Thái, Quận 10, TP.HCM</li>
                </ul>
                <p>Người đi khám có thể đi bộ từ khu chính sang khoa Khám bệnh và ngược lại, men theo đường Dương Quang Trung.</p>
                <figure>
                  <img src={HOSP115Map}></img>
                  <figcaption>Sơ đồ Bệnh viện Nhân dân 115</figcaption>
                </figure>

                <span id='1'></span>
                <h2>Bệnh viện Nhân dân 115 có những dịch vụ khám nào?</h2>
                <blockquote>
                  <div><i className="fas fa-quote-left"></i></div>
                  <p>Bệnh viện Nhân dân 115 triển khai đa dạng các dịch vụ khám phục vụ nhu cầu của người bệnh. Bài viết này sẽ tập trung chủ yếu vào 3 dịch vụ khám bệnh chính: Khám bệnh thông thường, Khám theo yêu cầu và Phòng khám VIP - Doanh nhân.</p>
                </blockquote>

                <span id='2'></span>
                <h3>1. Khám bệnh thông thường</h3>
                <ul>
                  <li>Địa chỉ: số 88 Thành Thái, quận 10, TP.HCM (khu E)</li>
                  <li> Thời gian làm việc:
                    <ul>
                      <li>Thứ 2 - Thứ 6, từ 7h00 - 16h00 (bắt đầu phát số từ sáng 5h30)</li>
                      <li>Thứ 2 - Thứ 6, từ 7h00 - 16h00 (bắt đầu phát số từ sáng 5h30)</li>
                    </ul>
                  </li>
                </ul>
                <figure>
                  <img src={HOSP115Gate}></img>
                  <figcaption>Lối vào khoa Khám bệnh, Bệnh viện Nhân dân 115</figcaption>
                </figure>
                <p>Lối vào chính của khoa Khám bệnh, Bệnh viện Nhân dân 115 ở đường Thành Thái, tách biệt so với các khu khác của Bệnh viện. Người đi khám có thể đăng kí khám BHYT, khám không BHYT và đăng kí khám hẹn giờ (qua 1080 hoặc tổng đài bệnh viện) tại khoa Khám bệnh.</p>
                <p>Khoa Khám bệnh nhận khám và điều trị cho nhiều đối tượng bệnh nhân khác nhau. Do đó, lượng người đăng kí khám bệnh hàng ngày tại khoa rất đông. Những ngày đầu tuần là thời gian cao điểm của khoa. Buổi chiều bệnh nhân sẽ ít đông hơn so với buổi sáng.</p>
                <p>Lầu 1, lầu 2 và lầu 3 là các khu khám chuyên sâu. Khoa Khám bệnh triển khai khám đa khoa các mặt bệnh khác nhau theo nhu cầu của người đi khám. Khoa có khu làm xét nghiệm, chụp chiếu riêng ở lầu 4, lầu 5.</p>
                <p>Dù chỉ khám thường nhưng người bệnh vẫn có thể đặt hẹn lịch khám trước thông qua 1080 hay tổng đài bệnh viện. Bệnh nhân đã đặt hẹn trước vào thẳng quầy số 04 (tầng trệt) để làm thủ tục đăng kí khám.</p>
                <h3 style={{ textDecoration: 'underline' }}>Lưu ý</h3>
                <ul>
                  <li>Khoa Khám bệnh có khu xét nghiệm, chụp chiếu riêng. Tuy nhiên, một vài trường hợp như chụp MRI, CT/SCAN thì sẽ được hướng dẫn qua khoa Chẩn đoán hình ảnh của Bệnh viện (khu A) để làm.</li>
                  <li>Giá khám bệnh thông thường theo như niêm yết của Bộ Y tế.</li>
                </ul>

                <span id='3'></span>
                <h3>2. Khám và điều trị theo yêu cầu</h3>
                <ul>
                  <li>Địa chỉ: số 527 Sư Vạn Hạnh, Quận 10, TP.HCM (khu A, Bệnh viện 115)</li>
                  <li> Thời gian làm việc:
                    <ul>
                      <li>Thứ 2 - Thứ 7, từ 7h00 - 16h00</li>
                      <li>Chủ nhật, từ 7h00 - 12h00</li>
                    </ul>
                  </li>
                </ul>
                <figure>
                  <img src={HOSP115Register}></img>
                  <figcaption>Khu vực nhận bệnh  tại khoa Khám và điều trị theo yêu cầu, Bệnh viện Nhân dân 115</figcaption>
                </figure>
                <p>Khoa Khám và điều trị theo yêu cầu nằm ở khu A Bệnh viện Nhân dân 115. Người đi khám đi thẳng từ cổng số 3 (đường Sư Vạn Hạnh) sẽ thấy khoa Khám theo yêu cầu trước mặt.</p>
                <p>Số lượng người đăng kí khám ở đây đông cả buổi sáng lẫn chiều. Vì chỉ có một tầng trệt là khu khám kết hợp với khu chờ nên lượng người ở khu này rất đông, tạo cảm giác hơi ngột ngạt.</p>
                <p>Ưu điểm khi khám tại khoa Khám và điều trị theo yêu cầu là khu xét nghiệm, chụp chiếu hay chẩn đoán hình ảnh nằm cùng một khu A. Riêng khoa Chẩn đoán hình ảnh nằm cạnh khu khám bệnh nên việc di chuyển qua lại giữa các khu dễ dàng.</p>
                <p>Ở khoa Khám và điều trị theo yêu cầu có nhiều nhân viên hướng dẫn và điều dưỡng đứng trước các phòng khám hoặc các quầy khu vực chờ. Bệnh nhân có thể nhờ sự giúp đỡ của đội ngũ nhân viên bệnh viện nếu cần thiết.</p>
                <p>Khám tại khoa Khám và điều trị theo yêu cầu, người đi khám có thể đặt lịch khám trước thông qua 1080 hay tổng đài của Bệnh viện. Khi đến khám, người bệnh vào thẳng quầy số 03 hoặc 04 để làm thủ tục đăng kí khám mà không phải khai lại thông tin trên Phiếu đăng kí khám.</p>
                <h3 style={{ textDecoration: 'underline' }}>Lưu ý</h3>
                <ul>
                  <li>Khoa Khám và điều trị theo yêu cầu không tiếp nhận khám BHYT.</li>
                  <li>Bệnh nhân khám chuyên khoa Mắt, Răng Hàm Mặt và Phụ khoa không khám ở khoa Khám và điều trị theo yêu cầu mà khám tại khoa Khám bệnh.</li>
                  <li>
                    <ul>
                      <li>Khám không hẹn giờ Thứ 2 - Thứ 6, 120.000đ/chuyên khoa</li>
                      <li>Khám không hẹn giờ Thứ 7 - Chủ nhật, 170.000đ/chuyên khoa</li>
                      <li>Khám hẹn giờ (đặt qua 1080) Thứ 2 - Thứ 6, 140.000đ/chuyên khoa</li>
                      <li>Khám hẹn giờ Thứ 7 - Chủ nhật, 190.000đ/chuyên khoa</li>
                    </ul>
                  </li>
                </ul>

                <span id='4'></span>
                <h3>3. Phòng khám VIP – Doanh nhân</h3>
                <ul>
                  <li>Địa chỉ: số 527 Sư Vạn Hạnh, Quận 10, TP.HCM (khu A, Bệnh viện 115, phía sau khoa Khám và điều trị theo yêu cầu)</li>
                  <li> Thời gian làm việc:
                    <ul>
                      <li>Thứ 2 - Thứ 6, từ 7h00 - 16h00</li>
                      <li>Thứ 7, từ 7h00 - 12h00</li>
                    </ul>
                  </li>
                </ul>
                <p>Phòng khám VIP – Doanh nhân là dịch vụ khám mới được Bệnh viện Nhân dân 115 triển khai trong khoảng thời gian gần đây. Bệnh nhân sẽ được khám hoàn toàn với các bác sĩ là giáo sư, tiến sĩ hàng đầu của Bệnh viện Nhân dân 115.</p>
                <p>Chất lượng dịch vụ của Phòng khám VIP – Doanh nhân được đánh giá tốt. Bệnh nhân không phải chờ đợi quá lâu ở tất cả các khâu vì được ưu tiên so với các dịch vụ khác và ít bệnh nhân hơn so với 2 dịch vụ khám ở trên.</p>
                <p>Khám tại Phòng khám VIP – Doanh nhân, người bệnh phải đăng kí trước qua hotline của Phòng khám (không đăng kí qua 1080 hay tổng đài bệnh viện). Thông thường, người bệnh nên hẹn trước khoảng 2 ngày – 1 tuần để Phòng khám chủ động sắp xếp lịch phù hợp cho cả bác sĩ và người đi khám.</p>
                <h3 style={{ textDecoration: 'underline' }}>Lưu ý</h3>
                <ul>
                  <li>Bác sĩ thăm khám trực tiếp tại Phòng khám VIP - Doanh nhân là các Giáo sư, Tiến sĩ, Trưởng khoa hoặc Phó khoa của Bệnh viện.</li>
                  <li>Bắt buộc phải đặt khám trước mới có thể đăng kí khám tại Phòng khám VIP -Doanh nhân.</li>
                  <li>Giá khám tại Phòng khám VIP – Doanh nhân dao động từ 300.000đ - 500.000đ/lượt khám, chưa tính các khoản làm chụp chiếu, xét nghiệm.</li>
                  <li>Phòng khám VIP - Doanh nhân không áp dụng khám BHYT.</li>
                </ul>

                <span id='5'></span>
                <h3>4. Bệnh viện Nhân dân 115 có khám tại các khoa không?</h3>
                <p>Ngoài các dịch vụ khám bệnh trên, tại một số khoa mũi nhọn và đông bệnh nhân, Bệnh viện Nhân dân 115 có triển khai khám dịch vụ ở khoa.</p>
                <blockquote>
                  <div><i className="fas fa-quote-left"></i></div>
                  <p>Các khoa này đều nằm tại khu B của bệnh viện và cạnh nhau. Người đi khám có thể đi bằng cổng số 1 (đường Dương Quang Trung) là tiện nhất để đến các khoa này.</p>
                </blockquote>
                <p>Khám dịch vụ tại khoa gồm có:</p>
                <ul>
                  <li>Khám dịch vụ Cơ xương khớp – khoa Cơ xương khớp (tầng trệt, khu B)</li>
                  <li>Khám dịch vụ VIP Tim mạch – khoa Tim mạch tổng quát (lầu 1 khu B)</li>
                  <li>Khám dịch vụ Tiêu hóa - Gan mật – khoa Nội tiêu hóa (tầng trệt, khu B)</li>
                  <li>Khám dịch vụ Ung bướu – khoa Ung bướu và Y học hạt nhân (tầng trệt, khu B)</li>
                </ul>
                <p>Các dịch vụ khám tại khoa nêu trên ít được bệnh nhân biết đến. Do đó người bệnh khi khám tại khoa không phải chờ đợi lâu, quá trình thăm khám diễn ra nhanh gọn. </p>
                <p>Giá khám tại khoa cho các dịch vụ này là từ 300.000đ - 500.000đ/lần khám, chưa có phí thực hiện Cận lâm sàng. Người bệnh có nhu cầu khám dịch vụ các khoa này có thể đặt lịch hẹn trước hoặc đến thẳng chuyên khoa để đăng kí khám. Ở các khoa còn trang bị một số loại máy móc, thiết bị để thực hiện chỉ định Cận lâm sàng chuyên sâu.</p>
                <h3 style={{ textDecoration: 'underline' }}>Lưu ý</h3>
                <p>Các dịch vụ khám tại khoa không khám BHYT. Khoa chỉ thực hiện khám dịch vụ trong tuần, không làm việc cuối tuần.</p>
                <p>Thời gian làm việc cụ thể như sau:</p>
                <ul>
                  <li>Thứ 2 - Thứ 6, từ 7h30 - 16h00</li>
                  <li>Thứ 7, Chủ nhật nghỉ.</li>
                </ul>

                <span id='6'></span>
                <h2>Bệnh viện Nhân dân 115 khám chuyên khoa nào?</h2>
                <p>Bệnh viện 115 là Bệnh viện Đa khoa hạng I của Sở Y tế TP.HCM. Bệnh viện tiếp nhận khám và điều trị nhiều chuyên khoa khác nhau. Trong đó, các chuyên khoa mũi nhọn của Bệnh viện bao gồm:</p>
                <ul>
                  <li>Tim mạch tổng quát</li>
                  <li>Thần kinh</li>
                  <li>Thận – tiết niệu</li>
                  <li>Ung bướu</li>
                  <li>Tiêu hóa – Gan mật</li>
                  <li>Cơ xương khớp…</li>
                </ul>
                <p>Mỗi chuyên khoa đều có các bác sĩ là những chuyên gia có kinh nghiệm và chuyên môn vững, là giảng viên của các trường đại học y nổi tiếng khu vực phía Nam.</p>

                <span id='7'></span>
                <h2>Lưu ý khi đi khám Bệnh viện Nhân dân 115</h2>
                <ul>
                  <li>Người đi khám gửi xe máy ở cổng số 1 (Dương Quang Trung),gửi ô tô ở cổng số 3 (Sư Vạn Hạnh). Không đi cổng số 2 vì Bệnh viện không mở cổng này.</li>
                  <li>Khám BHYT chỉ chấp nhận ở khoa Khám bệnh. Các dịch vụ khác không triển khai BHYT.</li>
                  <li>Thận – tiết niệu</li>
                  <li>Nếu khám tại khoa Khám và điều trị theo yêu cầu, người bệnh nên đi sớm để lấy số thứ tự vì khu Khám này rất đông.</li>
                  <li>Khám ở khoa Khám bệnh (Thành Thái),bệnh nhân nên đi khám vào thứ 5, thứ 6 sẽ ít đông hơn đầu và giữa tuần.</li>
                  <li>Để đến được các phòng khám, xét nghiệm cụ thể, bệnh nhân có thể đi theo bảng hướng dẫn trên tường hoặc hỏi nhân viên bệnh viện để tránh đi lạc do không gian bệnh viện lớn.</li>
                </ul>
                <p>Những nội dung LiveCare đã chia sẻ trong bài viết trên mong rằng sẽ đem lại những thông tin thiết thực cho người bệnh có nhu cầu khám chữa tại Bệnh viện Nhân dân 115.</p>
              </div>
            </div>

            <div className='table-content'>
              <div className='title-tbct'>Nội dung chính</div>
              <div className='tb-of-content detail-5'>
                <ul>
                  <li><a href='#0'>Bệnh viện Nhân dân 115 ở đâu?</a></li>
                  <li><a href='#1' >Bệnh viện Nhân dân 115 có những dịch vụ khám nào?</a></li>
                  <li><a href='#2'>1. Khám bệnh thông thường</a></li>
                  <li><a href='#3'>2. Khám và điều trị theo yêu cầu</a></li>
                  <li><a href='#4'>3. Phòng khám VIP – Doanh nhân</a></li>
                  <li><a href='#5'>4. Bệnh viện Nhân dân 115 có khám tại các khoa không?</a></li>
                  <li><a href='#6'>Bệnh viện Nhân dân 115 khám chuyên khoa nào?</a></li>
                  <li><a href='#7'>Lưu ý khi đi khám Bệnh viện Nhân dân 115</a></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail5);
