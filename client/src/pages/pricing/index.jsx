import ButtonPrimary from "@/components/button/ButtonPrimary";
import PostTypeItem from "@/components/post-type/PostTypeItem";
import { PostTypeAPI } from "apis/post-type";
import { LIMIT } from "configs/configs";
import { useEffect, useState } from "react";
export default function Pricing() {
  const [postTypes, setPostTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await PostTypeAPI.getPostTypes({
          offset: 0,
          limit: LIMIT,
          status: 1,
        });
        if (res.postTypes) {
          setPostTypes(res.postTypes);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className={"container mx-auto padding-mobile"}>
      <div className={"my-8"}>
        <h2 className={"m-0 mb-4 text-center"}>Bảng giá dịch vụ</h2>
        <div className={"text-center flex flex-col space-y-3"}>
          <p className={"text-primary"}>
            <span className="font-bold">TROTOT</span> xin gửi tới quý khách hàng
            thân thương bảng giá dịch vụ mới nhất của chúng tôi.
          </p>
          <p>
            Chúng tôi mong muốn đem lại những dịch vụ, những trải nghiệm tốt
            nhất, hoàn hảo nhất tới quý khách hàng. Dưới đây là các gói dịch vụ
            mà <span className="font-bold">TROTOT</span> đang cung cấp. Chúc quý
            khách chọn lựa được gói dịch vụ phù hợp với nhu cầu sử dụng của bản
            thân. Cảm ơn quý khách đã lựa chọn dịch vụ của chúng tôi.
          </p>
        </div>
        <div
          className={
            "flex md:flex-row flex-col space-y-5 md:space-y-0 md:space-x-5 items-start justify-center py-5 flex-wrap"
          }
        >
          {postTypes.map((item) => (
            <PostTypeItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
