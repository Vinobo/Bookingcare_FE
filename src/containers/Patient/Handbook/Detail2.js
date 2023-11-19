import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './scss/Detail.scss';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import five_clinic from '../../../assets/handBook/195059-dia-chi-kham-chan-thuong-the-thao.png';
import HOSP115 from '../../../assets/handBook/160418-bv-nhan-dan-115-ggrv-min.png';
import HOSP1A from '../../../assets/handBook/195258-bv-1a.png';
import HOSPTamAnh from '../../../assets/handBook/172858-bv-tam-anh-tphcm.jpg';
import HOSPACC from '../../../assets/handBook/165949-trung-tam-vat-ly-tri-lieu-tphcm-phong-kham-acc.jpg';
import HOSPSportMedic from '../../../assets/handBook/195124-pk-sport-medic.png';

class Detail2 extends Component {

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
              <h1>Top 5 địa chỉ khám chấn thương thể thao tốt tại TP.HCM</h1>
              <h2>Danh sách địa chỉ dưới đây sẽ giúp bạn đọc bớt băn khoăn khi cần phải lựa chọn địa chỉ khám chấn thương thể thao tốt tại TP.HCM.</h2>
              <div className='detail-ct'>
                <figure>
                  <img src={five_clinic}></img>
                  <figcaption>5 địa chỉ khám chấn thương thể thao tốt tại TPHCM</figcaption>
                </figure>
                <p>Hoạt động thể thao là phương pháp cải thiện sức bền và duy trì sức khỏe hiệu quả. Tuy nhiên, việc gặp chấn thương trong quá trình vận động là điều khó tránh khỏi, đặc biệt với các đối tượng chơi thể thao thường xuyên.</p>
                <p>Các chấn thương xảy ra do chơi thể thao cần được điều trị và chăm sóc đúng cách để tránh các biến chứng nguy hiểm, đảm bảo tiến độ phục hồi tốt. Cùng LiveCare tìm hiểu và tham khảo danh sách 5 đơn vị khám chấn thương thể thao tốt tại TP.HCM được những người chơi thể thao tin cậy và đánh giá cao về chất lượng thăm khám, điều trị.</p>

                <span id='0'></span>
                <h2>Các chấn thương thể thao thường gặp</h2>
                <p>Chấn thương thể thao là các loại tổn thương, chấn thương xảy ra trong quá trình thi đấu thể thao hoặc luyện tập. Trong quá trình hoạt động thể thao, bất cứ bộ phận nào của cơ thể cũng có thể bị tổn thương. Tuy nhiên, thuật ngữ chấn thương thể thao sử dụng để chỉ các tổn thương/chấn thương của hệ cơ xương khớp.</p>
                <p>Nguyên nhân gây ra chấn thương thể thao xuất phát từ việc người chơi phải liên tục vận động mạnh, đột ngột với những động tác khó. Bên cạnh đó, người chơi các môn thể thao đối kháng khó tránh khỏi tranh chấp, dẫn đến va chạm không đáng có. Nhiều loại chấn thương có thể khiến người chơi mất thời gian dài đến vài năm để hồi phục hoàn toàn.</p>
                <p>Một số loại chấn thương phổ biến mà người chơi có nguy cơ lớn gặp phải bao gồm:</p>
                <ul>
                  <li>Căng cơ, bong gân, chuột rút</li>
                  <li>Các vấn đề với dây chằng: giãn dây chằng, rách dây chằng</li>
                  <li>Gãy xương, trật khớp háng</li>
                  <li>Chấn thương đầu gối, ống đồng</li>
                  <li>Chấn thương vai…</li>
                </ul>

                <span id='1'></span>
                <h2>Top 5 Địa chỉ khám chấn thương thể thao tốt tại TP.HCM</h2>
                <p>Qua tìm hiểu, LiveCare đã tổng hợp danh sách 5 bệnh viện, phòng khám uy tín khám chấn thương thể thao tốt tại TP.HCM. Danh sách này là nguồn tham khảo đáng tin cậy cho bạn đọc là người mới bắt đầu hoặc đã chơi thể thao lâu năm.</p>

                <span id='2'></span>
                <h3>1. Khoa Y học Thể thao - Bệnh viện Nhân dân 115</h3>
                <ul>
                  <li> Địa chỉ:&nbsp;
                    <ul>
                      <li>Khám bệnh thông thường: số 88 Thành Thái, quận 10, TP.HCM (khu E)</li>
                      <li>Khám và điều trị theo yêu cầu, khu khám VIP: số 527 Sư Vạn Hạnh, Quận 10, TP.HCM (khu A)</li>
                    </ul>
                  </li>
                  <li>Giờ khám bệnh:&nbsp;
                    <ul>
                      <li>Thứ 2 - Thứ 7: từ 7h00 - 16h00</li>
                      <li>Chủ nhật: từ 7h00 - 12h00 (khu khám thường nghỉ thứ 7, Chủ nhật)</li>
                    </ul>
                  </li>
                </ul>
                <p>Khoa Y học Thể thao thuộc Bệnh viện Nhân dân 115 là một trong những nơi đầu tiên khám và điều trị chuyên sâu các chấn thương hệ cơ xương khớp xảy ra do vận động thể thao và các tai nạn liên quan đến lao động, sinh hoạt hàng ngày.</p>
                <p>Đơn vị từng là nơi chữa trị các ca chấn thương nặng cho các vận động viên bóng đá, bóng chuyền, karate chuyên nghiệp. Đồng thời, Khoa còn chịu trách nhiệm đánh giá và thẩm định sức khỏe đầu vào, kiểm tra sức khỏe định kỳ hàng năm cho các vận động viên tại các câu lạc bộ, trường năng khiếu thể thao tại Việt Nam.</p>
                <p>Thế mạnh của khoa Y học Thể thao, Bệnh viện Nhân dân 115 nằm ở các kỹ thuật phẫu thuật đòi hỏi chuyên môn cao trong điều trị chấn thương thể thao như:</p>
                <ul>
                  <li>Phẫu thuật nội soi tái tạo dây chằng chéo</li>
                  <li>Thay khớp gối nhân tạo cho bệnh nhân thoái hóa khớp gối nặng</li>
                  <li>Thay khớp háng nhân tạo</li>
                  <li>Phẫu thuật nội soi điều trị rách dây chằng tam giác</li>
                  <li>Phẫu thuật nội soi cắt lọc hoạt mạc viêm, lầy sạng khớp.</li>
                </ul>
                <p>Đội ngũ bác sĩ thuộc khoa Y học Thể thao là những chuyên gia đầu ngành trong lĩnh vực này. Đứng đầu khoa Y học Thể thao là Bác sĩ Chuyên khoa II Trần Văn Dương:</p>
                <ul>
                  <li>Trưởng khoa Y học Thể thao, Bệnh viện Nhân dân 115</li>
                  <li>Hội viên Hội Chấn thương Chỉnh hình Việt Nam</li>
                  <li>Hội viên Hội Chấn thương Chỉnh hình TP.HCM</li>
                </ul>
                <figure>
                  <img src={HOSP115}></img>
                  <figcaption>Bệnh viện Nhân dân 115 là một trong những bệnh viện tốp đầu về chuyên môn tại TP.HCM</figcaption>
                </figure>
                <h4>Kinh nghiệm đi khám</h4>
                <p>Người đi khám có thể đăng ký khám chấn thương thể thao tại khoa Khám và Điều trị theo yêu cầu của Bệnh viện Nhân dân 115. Việc chẩn đoán các tổn thương do tập luyện thể thao gây ra cần trải qua nhiều chỉ định cận lâm sàng khác nhau, do đó người bệnh nên đến sớm để thực hiện toàn bộ các chỉ định cần thiết trong ngày, tránh để qua ngày hôm sau.</p>
                <p>Ngoài ra, đối với khoa Khám và Điều trị theo yêu cầu (khu nhà 5 tầng cổng số 3 đường Sư Vạn Hạnh),bệnh nhân có thể hẹn trước lịch khám thông qua hotline Bệnh viện, dựa trên lịch khám của các bác sĩ khoa Y học Thể thao được cập nhật hàng tuần trên website Bệnh viện.</p>

                <span id='3'></span>
                <h3>2. Khoa Chấn thương chỉnh hình và Y học thể thao - Bệnh viện 1A</h3>
                <ul>
                  <li>Địa chỉ: 542 Lý Thường Kiệt (số cũ 1A),Phường 7, Quận Tân Bình, TP.HCM</li>
                  <li> Giờ khám bệnh:&nbsp;
                    <ul>
                      <li>Thứ Hai - Thứ Sáu: 07h - 16h30</li>
                      <li>Thứ Bảy: 07h - 11h30</li>
                    </ul>
                  </li>
                </ul>
                <p>Bệnh viện 1A, hay còn được biết đến là Bệnh viện Chỉnh hình và Phục hồi chức năng, là đơn vị đóng vai trò quan trọng trong lĩnh vực chấn thương chỉnh hình và phục hồi chức năng của khu vực miền Nam nói riêng và cả nước nói chung.</p>
                <p>Khoa Chấn thương chỉnh hình và Y học thể thao của Bệnh viện 1A là nơi tiếp nhận và điều trị các trường hợp bong gân, trật khớp, đứt dây chằng trước/sau, các vấn đề về cột sống, đĩa đệm… của đối tượng chơi thể thao chuyên và không chuyên.</p>
                <p>Đơn vị được bố trí đầy đủ các loại máy móc chụp chiếu, vật lý trị liệu, thực hiện liệu pháp gắng sức để hỗ trợ việc điều trị diễn ra suôn sẻ, giúp người bệnh hồi phục nhanh chóng.</p>
                <p>Nhận thấy nhu cầu khám chấn thương thể thao ngày càng tăng, Bệnh viện thành lập thêm Trung tâm Hiệu chỉnh cơ xương khớp và y học thể thao do Bác sĩ Calvin Q Trịnh đứng đầu. Trung tâm có chức năng chuyên sâu trong chăm sóc sức khỏe và điều trị cho người chơi thể thao lâu năm, cụ thể:</p>
                <ul>
                  <li>Cân bằng hệ cơ cho người chơi thể thao</li>
                  <li>Nội soi khớp vai</li>
                  <li>Phẫu thuật nội soi khớp gối</li>
                  <li>Phẫu thuật nội soi tái tạo dây chằng, sụn khớp gối, khớp cổ chân.</li>
                  <li>Trị liệu nắn khớp, giãn cơ, massage trị liệu phục hồi sức khỏe</li>
                  <li>Tăng cường chức năng hô hấp bằng liệu pháp oxy…</li>
                </ul>
                <p>Tập thể các bác sĩ chịu trách nhiệm khám và điều trị chấn thương thể thao tại Bệnh viện 1A đều là những bác sĩ có thâm niên trong lĩnh vực phục hồi chức năng với chuyên môn cao, từng đồng hành cùng các vận động viên chuyên nghiệp. Một số cái tên nổi bật có thể nhắc đến như:</p>
                <ul>
                  <li>Bác sĩ Chuyên khoa II Đinh Văn Thủy</li>
                  <li>Bác sĩ Chuyên khoa II Trịnh Minh Tú</li>
                  <li>Bác sĩ Calvin Q Trịnh</li>
                </ul>
                <figure>
                  <img src={HOSP1A}></img>
                  <figcaption>Bệnh viện 1A chuyên về chấn thương chỉnh hình và phục hồi chức năng</figcaption>
                </figure>
                <h4>Kinh nghiệm đi khám</h4>
                <p>Tham khảo các đánh giá dành cho Bệnh viện 1A từ người đi khám trước đó, LiveCare nhận thấy Bệnh viện không bị quá tải bệnh nhân như các bệnh viện công lớn khác. Do đó, người đi khám có thể lựa chọn khung giờ phù hợp để đến thăm khám. Tuy nhiên, bệnh nhân khám theo BHYT nên đến sớm để hoàn thành các thủ tục cần thiết.</p>
                <p>Ngoài ra, Bệnh viện 1A cũng triển khai cho người bệnh đặt lịch khám trước thông qua mục Đặt lịch khám trên website Bệnh viện. Bạn đọc có thể chọn hẹn giờ khám theo lịch mong muốn để rút bớt thời gian chờ đợi và làm thủ tục ban đầu.</p>

                <span id='4'></span>
                <h3>3. Khoa Phẫu thuật khớp & Y học thể thao - Bệnh viện Đa khoa Tâm Anh TP.HCM</h3>
                <ul>
                  <li>Địa chỉ: 2B Đ. Phổ Quang, Phường 2, Tân Bình, TP.HCM</li>
                  <li>Giờ khám bệnh: Thứ Hai đến thứ Bảy: 7h30 – 16h30</li>
                </ul>
                <p>Là một bệnh viện trẻ, mới đi vào hoạt động, song Bệnh viện Đa khoa Tâm Anh TP.HCM là địa chỉ đáng tin cậy khám và điều trị hiệu quả các thể loại chấn thương thể thao với đội ngũ nhân sự dày dạn kinh nghiệm và hệ thống máy móc hiện đại thuộc khoa Phẫu thuật khớp & Y học thể thao.</p>
                <p>Tiếp nhận và điều trị các vấn đề liên quan đến chấn thương thể thao là một trong những lĩnh vực mũi nhọn được bệnh viện đẩy mạnh. Cụ thể, đơn vị Y học thể thao được đầu tư hệ thống trang thiết bị hiện đại bậc nhất hiện nay, bao gồm:</p>
                <ul>
                  <li>Hệ thống chụp CT 768 lát cắt Somatom Drive (Siemens – Đức)</li>
                  <li>Hệ thống Cộng Hưởng Từ thế hệ mới MAGNETOM Amira BioMatrix (Siemens – Đức)</li>
                  <li>Hệ thống XQ treo trần DigiRAD-FP (Hàn Quốc)</li>
                  <li>Hệ thống phẫu thuật nội soi khớp gối, khớp vai (ConMed – Mỹ)</li>
                  <li>Hệ thống bơm tưới dịch nội soi khớp 10K, 10K150 (ConMed – Mỹ)</li>
                </ul>
                <p>Về phương pháp chữa trị, Bệnh viện Tâm Anh là cơ sở y tế đầu tiên tại Việt Nam thực hiện thảnh công phẫu thuật thay dây chằng nhân tạo - biện pháp hữu hiệu nhất cho các trường hợp đứt dây chằng trước/sau phức tạp. Kỹ thuật này giúp rút ngắn thời gian hồi phục chỉ sau 2 tháng phẫu thuật và người bệnh có thể chơi thể thao lại bình thường chỉ sau 6 tháng.</p>
                <p>Ngoài ra, khoa Phẫu thuật khớp & Y học thể thao có đủ năng lực thực hiện các kỹ thuật mổ phức tạp khác như:</p>
                <ul>
                  <li>Kỹ thuật bảo tồn dây chằng bằng phương pháp nối dây chằng với các chấn thương dưới 3 tuần.</li>
                  <li>Phẫu thuật thay khớp háng Superpath giúp bệnh nhân phục hồi nhanh chóng sau mổ.</li>
                  <li>Phẫu thuật thay khớp gối giúp bệnh nhân đi lại bình thường sau mổ.</li>
                  <li>Phẫu thuật điều trị cột sống ít xâm lấn với sự hỗ trợ của robot.</li>
                  <li>Nối gân achilles (gân gót)…</li>
                </ul>
                <p>Bệnh viện còn trang bị các phòng tập phục hồi chức năng giúp cải thiện nhanh chóng khả năng vận động mạnh, đặc biệt giúp vận động viên chuyên nghiệp lấy lại phong độ trong thời gian ngắn.</p>
                <p>Đội ngũ bác sĩ chuyên điều trị các ca chấn thương thể thao nặng tại Bệnh viện Tâm Anh TP.HCM có một số cái tên nổi bật, nhiều năm theo đuổi và nghiên cứu chuyên sâu về tổn thương do vận động thể thao gây nên. Một số bác sĩ có thể kể đến như:</p>
                <ul>
                  <li>Tiến sĩ, Bác sĩ Tăng Hà Nam Anh</li>
                  <li>Thạc sĩ, Bác sĩ Trần Anh Vũ</li>
                  <li>Thạc sĩ, Bác sĩ Chuyên khoa I Trương Hữu Bảo</li>
                </ul>
                <figure>
                  <img src={HOSPTamAnh}></img>
                  <figcaption>Bệnh viện Tâm Anh TP.HCM được đầu tư mạnh về trang thiết bị máy móc</figcaption>
                </figure>
                <h4>Kinh nghiệm đi khám</h4>
                <p>Các dịch vụ khám chữa bệnh của Bệnh viện Tâm Anh TP.HCM đều được thực hiện tại khoa Khám bệnh. Lượng người thăm khám hàng ngày là rất đông, do đó người đi khám có thể đặt trước lịch khám qua hotline Bệnh viện hoặc mẫu Đăng ký khám bệnh trên website Bệnh viện. Trong trường hợp đến trễ hoặc muốn dời hẹn, người đi khám cần báo lại sớm cho Bệnh viện nếu không sẽ mất lịch đặt khám đó.</p>
                <p>Bệnh viện yêu cầu người đi khám mang theo các kết quả khám, chỉ định cận lâm sàng trước đó để bác sĩ tham khảo. Ngoài ra, người đi khám cũng cần mang theo CMND hoặc hộ chiếu (người nước ngoài) để khai báo thông tin chính xác. </p>

                <span id='5'></span>
                <h3>4. Phòng khám ACC</h3>
                <ul>
                  <li> Địa chỉ:&nbsp;
                    <ul>
                      <li>Cơ sở Quận 1: 99 Nguyễn Du, Phường Bến Thành, Quận 1, TP.HCM</li>
                      <li>Cơ sở Quận 5: Lầu 1, Tản Đà Court, 86 Tản Đà, Phường 11, Quận 5, TP.HCM</li>
                    </ul>
                  </li>
                  <li>Giờ khám bệnh:&nbsp;
                    <ul>
                      <li>Thứ 2 - Thứ 6: 7h30 - 17h30</li>
                      <li>Thứ 7: 7h30 - 12h00</li>
                    </ul>
                  </li>
                </ul>
                <p>Phòng khám ACC là đơn vị chuyên về trị liệu thần kinh cột sống, hoạt động từ năm 2006 với các chi nhánh tại TP.HCM, Đà Nẵng và Hà Nội.</p>
                <p>Trong quá trình điều trị chấn thương do thể thao gây ra, bên cạnh phẫu thuật, việc phục hồi chức năng là vô cùng quan trọng. Đó cũng là thế mạnh của Phòng khám ACC khi trở thành địa chỉ đáng tin cậy đáp ứng nhu cầu trị liệu và phục hồi khả năng vận động sau chấn thương thể thao.</p>
                <p>Các phương pháp hiện đại mà Phòng khám đang áp dụng trong điều trị chấn thương thể thao gồm có:</p>
                <ul>
                  <li>Trị liệu thần kinh cột sống: nắn chỉnh khớp xương và đốt sống sai lệch vào đúng vị trí ban đầu, giảm các cơn đau thường ngày và chấm dứt chúng sau một thời gian điều trị.</li>
                  <li>Vật lý trị liệu chữa chấn thương thể thao: bác sĩ đưa ra phác đồ trị liệu chuẩn quốc tế, cá nhân hóa cho từng người bệnh để đạt được hiệu quả tốt nhất.</li>
                  <li>Phục hồi chức năng bằng hệ thống máy Pneumex (Mỹ) giúp giảm áp lực lên cột sống và cải thiện cân bằng sau chấn thương.</li>
                </ul>
                <p>Là địa chỉ trị liệu tin cậy của nhiều vận động viên quốc gia như Nguyễn Thùy Linh (Cầu lông),Hoàng Xuân Vinh (Bắn súng),Ánh Viên (Bơi lội)... Phòng khám ACC có sự đầu tư đầy đủ về hệ thống máy móc hiện đại, trong đó có:</p>
                <ul>
                  <li>Máy kéo giãn giảm áp cột sống DTS</li>
                  <li>Máy trị liệu vận động ATM2</li>
                  <li>Công nghệ sóng xung kích Shockwave</li>
                  <li>Tia laser cường độ cao thế hệ IV</li>
                </ul>
                <p>Như đã đề cập, đội ngũ chuyên gia của Phòng khám là các bác sĩ nước ngoài có chuyên môn sâu trong lĩnh vực nắn chỉnh cột sống và phục hồi chức năng. Các bác sĩ có thời gian nghiên cứu và điều trị thực tế nhiều năm trước khi đến với Phòng khám ACC TP.HCM.</p>
                <figure>
                  <img src={HOSPACC}></img>
                  <figcaption>Phòng khám ACC quy tụ đội ngũ chuyên gia nước ngoài đnág tin cậy</figcaption>
                </figure>
                <h4>Kinh nghiệm đi khám</h4>
                <p>Bạn đọc có thể tham khảo và đặt lịch khám tại Phòng khám ACC thông qua Nền tảng LiveCare. Lưu ý, chi phí khám và điều trị tại đây cao hơn so với các đơn vị công và một số đơn vị tư nhân trong khu vực, do đó người bệnh nên cân nhắc kỹ về chi phí trước khi quyết định điều trị tại đây. </p>

                <span id='6'></span>
                <h3>5. Phòng khám SPORTS MEDIC</h3>
                <ul>
                  <li>Địa chỉ: 285/44 Hẻm 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TPHCM
                  </li>
                  <li>Giờ khám bệnh: Cả tuần: 8h00 - 17h00
                  </li>
                </ul>
                <p>Phòng khám SPORTS MEDIC là địa chỉ cuối cùng trong danh sách các bệnh viện, phòng khám chuyên khám chấn thương thể thao mà BookingCare muốn giới thiệu đến bạn đọc.</p>
                <p>Phòng khám do Bác sĩ Chuyên khoa II Trương Công Dũng thành lập với thế mạnh lớn nhất là điều trị các dạng chấn thương liên quan đến dây chằng đầu gối, thoái hóa khớp và các vấn đề liên quan đến cột sống do chơi thể thao gây nên.</p>
                <p>Để đảm bảo việc khám và điều trị chính xác, không có sai sót, Phòng khám áp dụng quy trình 7 bước chẩn đoán khoa học gồm có:</p>
                <ul>
                  <li>Khai thác bệnh lý</li>
                  <li>Thăm khám trực tiếp</li>
                  <li>Test lâm sàng</li>
                  <li>Thực hiện chỉ định cận lâm sàng: X-quang, MRI, CT SCan,..</li>
                  <li>Phân loại bệnh, vị trí bệnh, xác định tổn thương chính xác</li>
                  <li>Đề xuất & chỉ định giải pháp điều trị</li>
                  <li>Đánh giá sức khỏe tổng quan và đưa ra phương án điều trị</li>
                </ul>
                <p>Đơn vị cũng được đầu tư mạnh về các loại máy móc, trang thiết bị hiện đại hỗ trợ quá trình khám, điều trị và hoạt động phục hồi chức năng cho người bệnh.</p>
                <p>Chịu trách nhiệm chuyên môn của Phòng khám SPORTS MEDIC là Bác sĩ Chuyên khoa II Trương Công Dũng - một trong những chuyên gia y học thể thao hàng đầu tại Việt Nam, từng là bác sĩ chính cho đội tuyển bóng đá Việt Nam qua các lứa khác nhau:</p>
                <ul>
                  <li>Nguyên bác sĩ thể thao Bệnh viện Nhân Dân 115</li>
                  <li>Hơn 26 năm hoạt động trong chuyên ngành dây chằng chéo</li>
                  <li>Có nhiều bài báo cáo khoa học chuyên về: Chấn thương chỉnh hình, Vi phẫu thuật, Nội soi khớp, Tái tạo khớp, Vật lý trị liệu, Cột sống, Thể thao,…</li>
                  <li>Khám và chữa trị hơn 50.000 bệnh nhân xương khớp – thể thao, phẫu thuật hơn 3000 trường hợp xương khớp – thể thao, tái tạo dây chằng gối cho hơn 2000 trường hợp.</li>
                </ul>
                <figure>
                  <img src={HOSPSportMedic}></img>
                  <figcaption>Phòng khám Medic Sport từng thăm khám cho nhiều vận động viên nổi tiếng</figcaption>
                </figure>
                <h4>Kinh nghiệm đi khám</h4>
                <p>Nếu có nhu cầu khám và điều trị tại Phòng khám SPORTS MEDIC, người bệnh cần đặt hẹn trước từ 1 - 2 ngày để Phòng khám sắp xếp lịch khám phù hợp với các bác sĩ tại đây. Người đi khám có thể đặt hẹn qua hotline Phòng khám hoặc đặt trực tiếp trên website.</p>
                <p>Đôi khi chấn thương xảy ra ngầm trong quá trình vận động, thể thao mà người chơi không chú ý. Chỉ khi có các cơn đau bất chợt hay dấu hiệu lạ ở các khớp thì người bệnh mới phát hiện.</p>
                <p>Vậy nên, ngay khi có những triệu chứng bất thường ở các vùng khớp, cơ sau khoảng thời gian vận động mạnh, người bệnh nên kiểm tra càng sớm càng tốt để tránh hậu quả nguy hiểm về sau.</p>
              </div>
            </div>

            <div className='table-content'>
              <div className='title-tbct'>Nội dung chính</div>
              <div className='tb-of-content'>
                <ul>
                  <li><a href='#0'>Các chấn thương thể thao thường gặp</a></li>
                  <li><a href='#1' >Top 5 Địa chỉ khám chấn thương thể thao tốt tại TP.HCM</a></li>
                  <li><a href='#2'>1. Khoa Y học Thể thao - Bệnh viện Nhân dân 115</a></li>
                  <li><a href='#3'>2. Khoa Chấn thương chỉnh hình và Y học thể thao - Bệnh viện 1A</a></li>
                  <li><a href='#4'>3. Khoa Phẫu thuật khớp & Y học thể thao - Bệnh viện Đa khoa Tâm Anh TP.HCM</a></li>
                  <li><a href='#5'>4. Phòng khám ACC</a></li>
                  <li><a href='#6'>5. Phòng khám SPORTS MEDIC</a></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail2);
