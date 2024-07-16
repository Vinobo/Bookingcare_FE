import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from 'react-router-dom';
// import { LANGUAGES } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
import './scss/Detail.scss';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
// import five_different from '../../../assets/handBook/105518-tam-soat-benh-doctor-check.png';
// import generalHealth from '../../../assets/handBook/110621-kham-tong-quat-doctor-check.png'
import Male from '../../../assets/handBook/114438phong-kham-nam-khoa-uy-tin3.jpg';

class Detail4 extends Component {

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
              <h1>Cần lưu ý gì trước khi đi khám Nam khoa (bệnh nam giới)</h1>
              <div className='detail-ct'>
                <figure>
                  <img src={Male} alt='handbook-img'></img>
                  <figcaption>Một số điều cần lưu ý trước khi đi khám Nam khoa</figcaption>
                </figure>
                <p>Ngày nay, khi kiến thức về sức khỏe giới tính tăng lên thì sự ngại ngùng trong mỗi người sẽ giảm đi. Những bệnh nhân lâu nay chỉ biết “âm thầm chịu đựng” sẽ vượt qua những mặc cảm bản thân, sẵn sàng đến gặp bác sĩ nam khoa để “trần tình” những điều thầm kín, khó nói của bản thân.</p>
                <p>Dẫu biết việc thăm khám nam khoa rất quan trọng, tuy nhiên các đấng mày râu vẫn còn đang hoang mang trong việc trang bị cho mình những kiến thức cũng như tâm lý cần thiết trong việc khám sức khỏe nam khoa. Nếu bạn đang có kế hoạch đi thăm khám, kiểm tra sức khỏe của đấng mày râu thì có thể tham khảo nội dung dưới đây để đi khám cho hiệu quả.</p>

                <span id='0'></span>
                <h2>Một số chú ý trước khi đi khám</h2>

                <span id='1'></span>
                <h3>1. Kiêng xuất tinh khoảng từ 3-5 ngày trước khi đi khám</h3>
                <p>Khi đi khám nam khoa, nhất là khi đi khám rối loạn cương dương, vô sinh hiếm muộn thì không nên quan hệ tình dục hay thủ dâm. Bởi vì, để khám nghiệm và chẩn đoán chính xác bệnh, bạn cần kiêng không được xuất tinh trong khoảng 3-5 ngày.</p>

                <span id='2'></span>
                <h3>2. Vệ sinh bộ phận sinh dục</h3>
                <p>Nhiều người băn khoăn về vấn đề có nên vệ sinh bộ phận sinh dục hay không? Câu trả lời là bạn không cần quá lo lắng, bạn có thể vệ sinh như bình thường. Nhưng chú ý là không cọ rửa quá kỹ, đặc biệt là khi có các vết loét, sùi, các tổn thương…</p>
                <p>Nam giới cần chú ý rằng, không nên vệ sinh vùng kín bằng những chất có tính tẩy rửa cao vì có thể xóa dấu vết, ảnh hưởng tới độ chính xác khi thăm khám, xét nghiệm.</p>

                <span id='3'></span>
                <h3>3. Hạn chế uống nước</h3>
                <p>Khi đi khám nam khoa, nếu nghi ngờ những dấu hiệu mắc phải do viêm đường tiết niệu gây ra bạn nên nhịn tiểu khoảng 8 tiếng để xét nghiệm đạt hiệu quả. Đó là lý do tại sao khi đi khám nam khoa, bạn nên hạn chế uống nước hoặc uống ít nước.</p>

                <span id='4'></span>
                <h3>4. Chuẩn bị tâm lý</h3>
                <p>Khi khám một số vấn đề Nam khoa thường có xét nghiệm tinh dịch đồ, đòi hỏi người chồng phải tự lấy mẫu bằng cách thủ dâm, nên việc này cần phải có tâm lý thoải mái nhất, tránh căng thẳng. Bạn cũng nên chuẩn bị sẵn 1 đoạn phim trong điện thoại để kích thích và xuất tinh dễ dàng hơn.</p>

                <span id='5'></span>
                <h3>5. Mặc quần áo thoải mái</h3>
                <p>Khi đi khám bạn nên mặc quần áo rộng rãi, thoải mái để quá trình thăm khám đơn giản và nhanh chóng hơn.</p>

                <span id='6'></span>
                <h2>Khám Nam khoa là khám những gì</h2>
                <span id='7'></span>
                <h3>1. Kiểm tra tổng quát</h3>
                <ul>
                  <li>Bác sĩ sẽ thăm khám các chỉ số sức khỏe cơ bản như cân nặng, huyết áp, nhịp tim, tình trạng sức khỏe phổi.</li>
                  <li>Bên cạnh đó, bác sĩ sẽ hỏi nam giới về tiền sử bệnh, tiền sử dùng các loại thuốc điều trị khác nhau, kết thúc việc khám tổng quát bằng cách kiểm tra ổ bụng xem có xuất hiện các khối u bất thường hoặc bị thoát vị bẹn hay không.</li>
                </ul>

                <span id='8'></span>
                <h3>2. Khám riêng bộ phận sinh dục</h3>
                <p>Bước này được thực hiện nhằm kịp thời phát hiện các thương tổn phía ngoài như dấu hiệu của các bệnh xã hội, kiểm tra xem có bị tinh hoàn ẩn hay không, có xuất hiện khối u hay không.</p>

                <span id='9'></span>
                <h3>3. Thực hiện các xét nghiệm cần thiết</h3>
                <p>Để quá trình chuẩn đoán các bệnh nam khoa được diễn ra nhanh chóng, chuẩn xác thì bắt buộc nam giới phải thực hiện các xét nghiệm cần thiết như xét nghiệm máu, xét nghiệm nước tiểu, xét nghiệm dịch niệu đạo, tinh dịch đồ…</p>
              </div>
            </div>

            <div className='table-content'>
              <div className='title-tbct'>Nội dung chính</div>
              <div className='detail-4'>
                <ul>
                  <li><a href='#0'>Một số chú ý trước khi đi khám</a></li>
                  <li><a href='#1' >1. Kiêng xuất tinh khoảng từ 3-5 ngày trước khi đi khám</a></li>
                  <li><a href='#2'>2. Vệ sinh bộ phận sinh dục</a></li>
                  <li><a href='#3'>3. Hạn chế uống nước</a></li>
                  <li><a href='#4'>4. Chuẩn bị tâm lý</a></li>
                  <li><a href='#5'>5. Mặc quần áo thoải mái</a></li>
                  <li><a href='#6'>Khám Nam khoa là khám những gì</a></li>
                  <li><a href='#7'>1. Kiểm tra tổng quát</a></li>
                  <li><a href='#8'>2. Khám riêng bộ phận sinh dục</a></li>
                  <li><a href='#9'>3. Thực hiện các xét nghiệm cần thiết</a></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail4);
