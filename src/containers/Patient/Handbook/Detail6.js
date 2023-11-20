import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './scss/Detail.scss';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import HOSPCRay from '../../../assets/handBook/110149-kham-than-kinh-benh-vien-cho-ray.jpg';
import HOSPCRayDo from '../../../assets/handBook/162533-phau-thuat-than-kinh-benh-vien-cho-ray.jpg';
import HOSPCRayReview1 from '../../../assets/handBook/115151-review-benh-vien-cho-ray-1png.jpg';
import HOSPCRayReview2 from '../../../assets/handBook/115150-review-benh-vien-cho-ray-2.jpg';
import HOSPCRayMap from '../../../assets/handBook/214810-so-do-benh-vien-cho-ray.jpg';

class Detail6 extends Component {

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

  handleClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/4`)
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
              <h1>Hướng dẫn đi khám tại khoa Thần kinh, Bệnh viện Chợ Rẫy: Thủ tục thăm khám? Bác sĩ nào giỏi?</h1>
              <h2>Tổng hợp thông tin về chung về khoa Thần kinh Bệnh viện Chợ Rẫy, thủ tục thăm khám, hướng dẫn đặt lịch khám không cần xếp hàng lấy số,... sẽ giúp bạn đọc thăm khám thuận tiện, nhanh chóng hơn.</h2>
              <div className='detail-ct'>
                <figure>
                  <img src={HOSPCRay}></img>
                  <figcaption>Đăng ký khám Thần kinh tại khoa khám bệnh lầu 1, Bệnh viện Chợ Rẫy</figcaption>
                </figure>
                <p>Là bệnh viện tuyến cuối của phía Nam, <a onClick={() => this.handleClinic()}>Bệnh viện Chợ Rẫy</a> tiếp nhận bệnh nhân thăm khám và điều trị ở nhiều chuyên khoa: ung bướu, nội tiết, nội tiêu hóa, nội tim mạch, cơ xương khớp,... Trong đó, khám Thần kinh là thế mạnh đặc biệt của bệnh viện. Nếu bạn đang có dự định thăm khám tại Khoa Thần kinh Bệnh viện Chợ Rẫy (Nội thần kinh, Ngoại thần kinh),những thông tin dưới đây sẽ giúp bạn đưa ra quyết định thăm khám phù hợp và giúp quá trình đi khám thuận tiện, nhanh chóng hơn.</p>
                <blockquote>
                  <div><i className="fas fa-quote-left"></i></div>
                  <p>Bệnh lý thần kinh là một trong những bệnh lý phức tạp nhất, nếu không có hướng điều trị kịp thời sẽ dẫn tới những biến chứng xấu, nguy hiểm đến tính mạng người bệnh. Để điều trị bệnh hiệu quả, người bệnh nên lựa chọn thăm khám tại các bệnh viện, phòng khám Thần kinh uy tín. </p>
                </blockquote>

                <span id='0'></span>
                <h2>Địa chỉ, lịch khám Thần kinh tại Bệnh viện Chợ Rẫy</h2>
                <ul>
                  <li>Địa chỉ: 201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP.Hồ Chí Minh</li>
                  <li>Lịch khám Bệnh viện Chợ Rẫy: Thứ 2 - thứ 6: 6h - 16h. Bệnh viện bắt đầu nhận bệnh nhân và phát số thứ tự từ 4h00 sáng hằng ngày và khám xuyên trưa.</li>
                </ul>

                <span id='1'></span>
                <h2>Khám Thần kinh, Bệnh viện Chợ Rẫy có tốt không?</h2>
                <p>Khoa Thần kinh Bệnh viện Chợ Rẫy có 2 chuyên khoa: Nội thần kinh và Ngoại thần kinh. Người bệnh vì thế có thể thăm khám và điều trị tại chỗ, có thể kết hợp điều trị nội khoa, ngoại khoa để đạt được kết quả tốt nhất.</p>

                <span id='2'></span>
                <h3>Khoa Nội Thần kinh</h3>
                <p>Một trong những khác biệt nổi bật của Doctor Check so với các phòng khám khác là thời gian hoạt động linh hoạt. Phòng khám mở cửa từ 6h00 sáng đến 15h00 chiều, giúp khách hàng có thể dễ dàng đặt lịch hẹn và tới khám bệnh ngay từ sáng sớm.</p>
                <ul>
                  <li>Bệnh động kinh, cơn co giật, cơn mất ý thức, cơn rối loạn tâm thần</li>
                  <li>Đau đầu, đau nửa đầu, đau nhức đầu, đau đầu mãn tính</li>
                  <li>Suy nhược thần kinh</li>
                  <li>Run các chi, run toàn thân</li>
                  <li>Bệnh Parkinson, vận động chậm chạp, cứng, run</li>
                  <li>Tai biến mạch máu não do huyết áp cao, đái đường, giai đoạn mới, di chứng.</li>
                  <li>Chóng mặt, ù tai do hội chứng tiền đình</li>
                  <li>Rối loạn thần kinh thực vật</li>
                  <li>...</li>
                </ul>
                <p>Với chất lượng đội ngũ bác sĩ chuyên môn cao lại được hỗ trợ của trang thiết bị hiện đại, các bác sĩ tại khoa đã khám và điều trị thành công cho nhiều người bệnh. Trong đó, có những bệnh nhân đã thăm khám ở nhiều nơi nhưng chưa hiệu quả. </p>

                <span id='3'></span>
                <h3>Khoa Ngoại thần kinh</h3>
                <p>Khoa Nội Thần kinh Bệnh viện Chợ Rẫy tiếp nhận thăm khám và điều trị hầu hết các bệnh lý thần kinh. Một số mặt bệnh, khoa đang tiếp nhận thăm khám như:Cùng với khoa Nội thần kinh, khoa Ngoại thần kinh của bệnh viện chuyên theo dõi và điều trị các bệnh lý thần kinh cần đến sự can thiệp ngoại khoa (như chấn thương sọ não, mổ u não,...).</p>
                <p>Khoa Ngoại thần kinh của Bệnh viện Chợ Rẫy được đánh giá cao khi áp dụng nhiều kỹ thuật cao trong phẫu thuật thần kinh, thực hiện thành công nhiều ca mổ khó.</p>
                <ul>
                  <li>Bệnh viện áp dụng hệ thống phẫu thuật thần kinh có dẫn đường trong điều trị u não và những tổn thương mạch máu nhỏ ở não. Đây là kỹ thuật cao trong ngành phẫu thuật thần kinh, được áp dụng lần đầu tiên ở nước ta. Ưu điểm của kỹ thuật này là tránh gây thương tổn não, ít mất máu do diện tích mở sọ nhỏ (vừa với khối u).</li>
                  <li>Ngoài ra, đối với bệnh nhân Parkinson không còn đáp ứng với điều trị nội khoa, có thể áp dụng phương pháp phẫu thuật thần kinh có dẫn đường, cho kết quả khả quan. </li>
                  <li>Bên cạnh đó, phẫu thuật điều trị động kinh đã được các bác sĩ khoa Ngoại thần kinh Bệnh viện Chợ Rẫy thực hiện thành công. Trong năm 2017, bệnh viện đã phẫu thuật thành công cho bệnh nhân nam, 23 tuổi, bị động kinh 13 năm, mỗi ngày bị 4 - 8 cơn/ngày. Sau khi xem xét tình trạng của bệnh nhân, các bác sĩ đã quyết định thực hiện phẫu thuật. Ca phẫu thuật thành công, kết quả phục hồi tốt, bệnh nhân đã cắt được cơn động kinh.</li>
                </ul>
                <p>Nhìn chung, theo đánh giá của LiveCare, khi thăm khám Thần kinh tại Bệnh viện Chợ Rẫy, người bệnh sẽ được thăm khám, chẩn đoán và đưa ra hướng điều trị hiệu quả. Tùy thuộc vào mức độ, giai đoạn bệnh, bác sĩ sẽ chỉ định điều trị bằng nội khoa, ngoại khoa hoặc kết hợp để cho hiệu quả cao nhất cho người bệnh.</p>

                <span id='4'></span>
                <h3>Bác sĩ giỏi khoa Thần Kinh, Bệnh viện Chợ Rẫy</h3>
                <p>Là bệnh viện tuyến cuối nên các bác sĩ đang công tác tại Bệnh viện Chợ Rẫy đều có trình độ chuyên môn cao. Trong đó, thăm khám tại khoa Nội thần kinh, Ngoại thần kinh của bệnh viện có nhiều bác sĩ được biết đến là bác sĩ giỏi Thần kinh ở TPHCM, chuyên gia đầu ngành như:</p>
                <ul>
                  <li>TS.BS Nguyễn Anh Tài - Trưởng khoa Nội thần kinh</li>
                  <li>BS.CKII Trương Văn Luyện - Phó khoa Nội thần kinh</li>
                  <li>PGS.TS Huỳnh Lê Phương - Trưởng khoa Ngoại Thần kinh</li>
                  <li>TS.BS Nguyễn Kim Chung - Phó khoa Ngoại Thần kinh</li>
                  <li>TS.BS Nguyễn Ngọc Khang - Phó khoa Ngoại Thần kinh</li>
                </ul>
                <p>Các bác sĩ tại khoa Thần Kinh đã điều trị thành công nhiều trường hợp bệnh nặng, phẫu thuật cứu sống nhiều bệnh nhân gặp các tình trạng bệnh phức tạp như phình máu não nguy cấp, bệnh nhân đột quỵ trên bệnh nền Lupus ban đỏ, u não xâm lấn,...</p>
                <p>Bên cạnh công tác thăm khám, các bác sĩ của khoa cũng thực hiện nhiều đề tài nghiên cứu (phẫu thuật chuyển lưu dịch não tủy não thất vào tâm nhĩ: trong điều trị đầu nước (não úng thủy); dị dạng động tĩnh mạch não xuất huyết,... ). Nhờ đó đưa ra hướng điều trị ngày càng tốt hơn, hiệu quả hơn cho bệnh nhân. </p>
                <figure>
                  <img src={HOSPCRayDo}></img>
                  <figcaption>Bác sĩ Bệnh viện Chợ Rẫy thực hiện phẫu thuật thần kinh</figcaption>
                </figure>

                <span id='5'></span>
                <h3>Cơ sở vật chất tại bệnh viện</h3>
                <p><a onClick={() => this.handleClinic()}>Bệnh viện Chợ Rẫy</a> là bệnh viện công, tuyến cuối của phía Nam, nên cơ sở vật chất được đầu tư hiện đại, đầy đủ các thiết bị cần thiết trong thăm khám và điều trị bệnh lý Thần Kinh.</p>
                <ul>
                  <li>Máy điện cơ: được sử dụng để thăm dò hệ thần kinh ngoại biên, hỗ trợ chẩn đoán và theo dõi các rối loạn thần kinh ngoài tủy sống như hội chứng ống cổ tay, bệnh lý thần kinh ngoại biên; các rối loạn ảnh hưởng đến tế bào thần kinh vận động của tủy sống,...</li>
                  <li>Điện não: giúp tìm ra những sóng điện não bất thường, hỗ trợ chẩn đoán bệnh đau đầu, động kinh,...</li>
                  <li>Chụp PET/CT (công nghệ hiện đại hàng đầu thế giới) giúp đánh giá tổn thương não gây động kinh, chẩn đoán u não nguyên phát và di căn ung thư vào não, đánh giá tình trạng sa sút trí tuệ,...</li>
                  <li>Máy chụp cộng hưởng từ (MRI): đây là phương tiện chẩn đoán hình ảnh hiện đại, cho kết quả hình ảnh chi tiết, rõ nét hơn, cần thiết trong chẩn đoán và phát hiện các lý thần kinh.</li>
                  <li>Chụp cắt lớp CT-scan: Người bệnh có thể được chỉ định chụp CT để chẩn đoán, theo dõi nhiều bệnh lý như đau đầu, đau nửa đầu, động kinh, có khối u não, não úng thủy, tai biến mạch máu nào,...</li>
                  <li>...</li>
                </ul>
                <p>Đây đều là các thiết bị hiện đại, cho hình ảnh sắc nét, độ phân giải cao, giúp việc chẩn đoán bệnh lý thần kinh chính xác hơn, phát hiện sớm để điều trị kịp thời, hạn chế bỏ sót các triệu chứng.</p>

                <span id='6'></span>
                <h3>Review khám Thần kinh tại Bệnh viện Chợ Rẫy</h3>
                <p>Trong hơn 2000 đánh giá bệnh viện nhận được trên Google, có nhiều phản hồi tích cực và nhận xét chưa hài lòng. </p>
                <p>Các nhận xét tích cực dành cho chất lượng đội ngũ bác sĩ giỏi, chuyên môn cao. Các bác sĩ giải đáp thắc mắc chuyên môn tận tình, người bệnh yên tâm chữa trị.</p>
                <p>Theo đánh giá của BookingCare, Bệnh viện Chợ Rẫy là địa chỉ tin cậy để khám và điều trị các bệnh thần kinh ở tình trạng nặng. Hầu như những bệnh mà các bệnh viện tuyến tỉnh không thể xử lý được, bệnh nhân đều tìm đến hoặc được chuyển lên Bệnh viện Chợ Rẫy.</p>
                <p>Bên cạnh phản hồi tích cực, bệnh viện cũng nhận được một số phản hồi chưa tốt về phong cách tiếp đón của nhân viên y tế, một số khâu làm thủ tục còn chậm, người bệnh chờ đợi lâu. Tuy nhiên, đánh giá khách quan, mỗi ngày bệnh viện tiếp đón đến hàng ngàn lượt bệnh nhân, nên không tránh khỏi tình trạng quá tải.</p>
                <p>Khắc phục những vấn đề này, trong những năm gần đây, bệnh viện đã có những giải pháp cải thiện. Trong đó, để giảm thời gian chờ khám, bệnh viện đã hợp tác với LiveCare, hỗ trợ đặt lịch khám các chuyên khoa.</p>
                <p>Để cải thiện phong cách phục vụ của nhân viên y tế, trong năm 2020, bệnh viện áp dụng <a href="http://choray.vn/Default.aspx?tabid=135&amp;ID=9032" target='_blank'>mô hình giao tiếp AIDET</a> - mô hình giao tiếp chuẩn giữa nhân viên y tế và bệnh nhân. Người bệnh đi khám nếu có nhận xét về sự thay đổi này có thể góp ý cuối bài viết để BookingCare và bạn đọc khác cùng tham khảo.</p>
                <figure>
                  <img src={HOSPCRayReview1}></img>
                  <figcaption>Phản hồi về chất lượng thăm khám tại BV Chợ Rẫy</figcaption>
                </figure>
                <figure>
                  <img src={HOSPCRayReview2}></img>
                  <figcaption>Đánh giá của bệnh nhân thăm khám tại Bệnh viện Chợ Rẫy</figcaption>
                </figure>

                <span id='7'></span>
                <h2>Kinh nghiệm đi khám thần kinh tại Bệnh viện Chợ Rẫy</h2>
                <ul>
                  <li>Để khám Thần kinh, người bệnh đăng ký khám tại khu khám bệnh lầu 1, nhà A, 201B Nguyễn Chí Thanh (khám thường). Khi đăng ký khám nên nói rõ tình trạng gặp phải để nhân viên hướng dẫn đăng ký chuyên khoa phù hợp.</li>
                  <li>Ngoài khu khám này, người bệnh có thể khám Thần kinh ở khu khám bệnh II và phòng khám chuyên gia: </li>
                  <li>
                    <ul>
                      <li>Khám bệnh II (cổng số 4 Bệnh viện Chợ Rẫy, đường Phạm Hữu Chí, Quận 5, TP.HCM): Khám dịch vụ.</li>
                      <li>Phòng khám chuyên gia (cổng số 1, lầu 1, khu khám bệnh): phụ trách phòng khám chuyên gia là các bác sĩ đầu ngành của bệnh viện (phó giáo sư, tiến sĩ hoặc trưởng, phó khoa). Người bệnh được chọn bác sĩ mong muốn. Lịch khám Thần kinh tại phòng khám chuyên gia không cố định. Bệnh nhân thăm khám nên liên hệ bệnh viện trước theo số điện thoại 028.39556079. Phòng khám chuyên gia sẽ liên lạc bác sĩ và lên lịch thăm khám cho người bệnh.</li>
                    </ul>
                  </li>
                </ul>
                <figure>
                  <img src={HOSPCRayMap}></img>
                  <figcaption>Sơ đồ Bệnh viện Chợ Rẫy</figcaption>
                </figure>
                <ul>
                  <li>Giá khám tại Bệnh viện Chợ Rẫy: Giá khám thường tại khu khám bệnh lầu 1, nhà A là 38.700đ. Trong trường hợp người bệnh có bảo hiểm y tế đúng tuyến (có BHYT và có giấy chuyển tuyến đúng tuyến về bệnh viện Chợ Rẫy) sẽ được miễn phí chi phí khám bệnh.</li>
                  <li>Một trong những kinh nghiệm đi khám tại BV Chợ Rẫy người bệnh cần lưu ý: trước các cổng của bệnh viện có rất nhiều cò mồi. Người bệnh đi khám tuyệt đối không nghe theo, nên đi thẳng vào bên trong khoa Khám bệnh để đăng kí khám, tránh bị lừa đảo.</li>
                </ul>
              </div>
            </div>

            <div className='table-content'>
              <div className='title-tbct'>Nội dung chính</div>
              <div className='tb-of-content detail-6'>
                <ul>
                  <li><a href='#0'>Địa chỉ, lịch khám Thần kinh tại Bệnh viện Chợ Rẫy</a></li>
                  <li><a href='#1'>Khám Thần kinh, Bệnh viện Chợ Rẫy có tốt không?</a></li>
                  <li><a href='#2'>Khoa Nội Thần kinh</a></li>
                  <li><a href='#3'>Khoa Ngoại thần kinh</a></li>
                  <li><a href='#4'>Bác sĩ giỏi khoa Thần Kinh, Bệnh viện Chợ Rẫy</a></li>
                  <li><a href='#5'>Cơ sở vật chất tại bệnh viện</a></li>
                  <li><a href='#6'>Review khám Thần kinh tại Bệnh viện Chợ Rẫy</a></li>
                  <li><a href='#7'>Kinh nghiệm đi khám thần kinh tại Bệnh viện Chợ Rẫy</a></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail6);
