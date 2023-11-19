import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './scss/Detail.scss';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import GI_END from '../../../assets/handBook/152930noi-soi-tieu-hoa.jpg';



class Detail3 extends Component {

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
              <h1>Cần lưu ý gì khi đi khám Tiêu hóa?</h1>
              <div className='detail-ct'>
                <figure>
                  <img src={GI_END}></img>
                  <figcaption>Bác sĩ quan sát hình ảnh nội soi trên màn hình</figcaption>
                </figure>
                <p>Trước khi đi khám, dù là chuyên khoa nào bạn cũng nên có sự chuẩn bị để việc thăm khám có hiệu quả tốt hơn. Đặc biệt là tiêu hóa, chuyên khoa tiêu hóa có một số đặc thù không giống các chuyên khoa khác mà người bệnh cần lưu ý khi đi khám.</p>
                <p>Nhiều trường hợp khám tiêu hóa cần phải nội soi, do vậy người bệnh cần chuẩn bị trước về ăn uống, tâm lý để tránh mất thời gian. Người bệnh nên nhịn ăn ít nhất 4 tiếng trước khi đi khám để đề phòng làm các xét nghiệm, nội soi tiêu hóa.</p>
                <span id='0'></span>
                <h2>Lưu ý khi đi khám Tiêu hóa</h2>

                <span id='1'></span>
                <h3>1. Đối với nội soi dạ dày</h3>
                <ul>
                  <li>Nhịn ăn 6 - 8 tiếng trước nội soi</li>
                  <li>Nhịn uống 2 – 3 tiếng trước khi nội soi để tránh gây sặc lên đường thở trong quá trình nội soi</li>
                  <li>Những bệnh nhân mắc bệnh hen, tim mạch, tăng huyết áp và tiền sử dị ứng cần báo bác sĩ</li>
                  <li>Đối với phụ nữ: Báo bác sĩ nếu đang mang thai hoặc nghi ngờ có thai.</li>
                </ul>

                <span id='2'></span>
                <h3>2. Đối với nội soi đại tràng</h3>
                <ul>
                  <li>Kết thúc bữa tối trước 20h00 tối hôm trước</li>
                  <li>Để giúp đại tràng sạch hơn, 3 - 4 ngày trước nội soi, nên ăn nhẹ và dùng những thực phẩm ít chất xơ, dễ tiêu hóa: bánh mỳ, cơm, rau củ trái cây không hạt, không vỏ, thịt nạc, trứng...</li>
                  <li>Cần tránh những thực phẩm như: bỏng ngô, thực phẩm giàu chất béo, ngũ cốc, trái cây có vỏ hoặc hạt, ngô...</li>
                  <li>Đối với phụ nữ: Nội soi sau khi hết kỳ kinh nguyệt; nên báo với bác sĩ nếu đang mang thai hoặc nghi ngờ mang thai</li>
                  <li>Tránh xa các loại nước có màu xanh, đỏ, tím bởi những loại thực phẩm có màu có thể khiến bác sĩ khó quan sát đại tràng hơn.</li>
                  <li>Những bệnh nhân mắc bệnh hen, tim mạch, tăng huyết áp và tiền sử dị ứng cần báo bác sĩ.</li>
                </ul>

                <span id='3'></span>
                <h2>Khám tiêu hóa gồm những gì</h2>

                <span id='4'></span>
                <h3>Bước 1: Khám tổng quát </h3>
                <p>Bác sĩ sẽ khám tổng quát chung để đánh giá tình trạng của bệnh nhân, như: cân nặng, đo huyết áp, hỏi bệnh, tiểu sử bệnh, dị ứng thuốc gì không… Sau đó sẽ đưa ra chỉ định cần nội soi hay không (nếu không cần nội soi thì bác sĩ sẽ kê đơn thuốc luôn và bệnh nhân ra về).</p>

                <span id='5'></span>
                <h3>Bước 2: Chuẩn bị nội soi (trong trường hợp bác sĩ chỉ định nội soi)</h3>
                <p>Ở bước này bệnh nhân sẽ phải làm sạch đường tiêu hóa để hỗ trợ quá trình nội soi được thuận lợi. Mỗi cơ sở y tế sẽ có những phương pháp làm sạch đại tràng khác nhau.</p>
                <p>Người bệnh có thể được sử dụng thuốc nhuận tràng hay thụt nước kết hợp với thụt thuốc thông qua đường hậu môn. Do tác dụng của thuốc, người bệnh sẽ đi đại tiêu nhiều lần. Khi nào đại tiện ra nước trong là ruột đã sạch hoàn toàn.</p>
                <p>Việc chuẩn bị để nội soi đại tràng có thể gây nhiều bất tiện nhưng bạn nên nhớ rằng: đây là một bước khám thông minh để bảo vệ sức khỏe của chính bạn. Bạn càng chuẩn bị tốt, bác sĩ càng quan sát được rõ ràng và quá trình nội soi sẽ nhanh hơn.</p>

                <span id='6'></span>
                <h3>Bước 3: Nội soi</h3>
                <p>Có 2 loại là nội soi gây mê và nội soi không gây mê. Nếu không gây mê thì quá trình nội soi thường gây khó chịu cho người bệnh, tuy không đau nhưng có thể cảm thấy buồn nôn (với nội soi dạ dày).</p>
                <ul>
                  <li>Với nội soi gây mê thì bác sĩ chuyên về gây mê sẽ thăm khám và gây mê cho bệnh nhân. Sau khi ổn định thì bác sĩ chuyên nội soi sẽ tiến hành.</li>
                  <li>Bác sĩ tiến hành nội soi và quan sát đường tiêu hóa, nếu thấy bất thường cần xử lý thì bác sĩ sẽ đưa dụng cụ luồn qua ống nội soi vào cơ thể để xử lý (ví dụ như cắt polyp).</li>
                </ul>

                <span id='7'></span>
                <h3>Bước 4: Nghỉ ngơi, hồi sức</h3>
                <p>Với nội soi, bệnh nhân có thể về ngay trong ngày mà không cần lưu viện. Tuy nhiên, bệnh nhân nên nằm nghỉ ngơi một lúc để đỡ bị choáng do thuốc gây mê vẫn còn tác dụng.</p>
              </div>
            </div>

            <div className='table-content'>
              <div className='title-tbct'>Nội dung chính</div>
              <div className='detail-3'>
                <ul>
                  <li><a href='#0'>Lưu ý khi đi khám Tiêu hóa</a></li>
                  <li><a href='#1' >1. Đối với nội soi dạ dày</a></li>
                  <li><a href='#2'>2. Đối với nội soi đại tràng</a></li>
                  <li><a href='#3'>Khám tiêu hóa gồm những gì</a></li>
                  <li><a href='#4'>Bước 1: Khám tổng quát</a></li>
                  <li><a href='#5'>Bước 2: Chuẩn bị nội soi (trong trường hợp bác sĩ chỉ định nội soi)</a></li>
                  <li><a href='#6'>Bước 3: Nội soi</a></li>
                  <li><a href='#6'>Bước 4: Nghỉ ngơi, hồi sức</a></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail3);
