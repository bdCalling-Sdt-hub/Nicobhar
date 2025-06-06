
import { Button, Input, Form } from "antd";
import { usePastDetailsSupportedAgentDashboardApiQuery } from "../../redux/features/supportedAgentDashboard/supportedAgentDashboardApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

const SuperAdminPastInspectDetails = () => {
  const [formOne] = Form.useForm();
  const { id } = useParams()


  const { data, isLoading } = usePastDetailsSupportedAgentDashboardApiQuery(parseInt(id));
  const pastDetailsData = data?.data
  console.log(pastDetailsData?.image.map(item => console.log(item)))


  useEffect(() => {
    if (pastDetailsData) {
      formOne.setFieldsValue({
        asset: pastDetailsData?.ticket?.asset?.product,
        serialNumber: pastDetailsData?.ticket?.asset?.serial_number,
        organization: pastDetailsData?.ticket?.asset?.organization?.name,
        location: pastDetailsData?.ticket?.user?.address,
        problem: pastDetailsData?.ticket?.problem,
        technician: pastDetailsData?.technician?.name,
        comment: pastDetailsData?.support_agent_comment,
        status: pastDetailsData?.status,
        location_employee_signature: pastDetailsData?.location_employee_signature,
      })
    }
  }, [pastDetailsData, formOne])

  if (isLoading) return <p>Loading....</p>
  return (
    <div className=" p-6">
      {/* Back Button */}
      <Button
        style={{ backgroundColor: "transparent" }}
        icon={
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="18" fill="#D9D9D9" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6668 19.3332L21.3336 26L23 24.3336L17.1664 18.5L23 12.6664L21.3336 11L14.6668 17.6668C14.4459 17.8878 14.3217 18.1875 14.3217 18.5C14.3217 18.8125 14.4459 19.1122 14.6668 19.3332Z"
              fill="black"
            />
          </svg>
        }
        type="text"
        className="mb-6 text-xl text-[500] text-[#000000]"
        onClick={() => window.history.back()}
      >
        Back To Sheets
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[20px] text-primary font-semibold ">
          Inspection sheet of
          <span className="text-secondary font-semibold px-2">
            {pastDetailsData?.ticket?.asset?.product}
          </span>
          {(pastDetailsData?.ticket?.asset?.serial_number)}
        </p>
      </div>

      {/* Form */}
      <Form form={formOne} layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <Form.Item
            label="Asset"
            name="asset"
          >
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Right Column */}
          <Form.Item
            label="Serial Number"
            name="serialNumber"
          >
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Organization */}
          <Form.Item
            label="Organization"
            name="organization"
          >
            <Input style={{ width: "100%", height: "44px" }} readOnly />
          </Form.Item>

          {/* Location */}
          <Form.Item
            label="Location"
            name="location"
          >
            <Input style={{ width: "100%", height: "44px" }} />
          </Form.Item>
        </div>

        {/* Problem */}
        <Form.Item label="Problem" name="problem" className="mb-6">
          <TextArea
            rows={6}
            placeholder="Describe the problem here..."
          />
        </Form.Item>


        {
          pastDetailsData?.video?.length > 0 && pastDetailsData?.image?.length > 0 && <div className="flex flex-col gap-8">
            <div className="w-full border rounded-md">
              {
                pastDetailsData?.image?.length > 0 && pastDetailsData?.image?.length < 2 && <div className=" p-2 flex gap-2">
                  <div className="flex flex-wrap gap-2">
                    {
                      pastDetailsData?.image.map((item, index) => {
                        return (
                          <div key={index} className="rounded-lg">
                            <img src={item} alt="" className="w-[251px] h-[200px] object-cover rounded-md" />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              }

              {/*  image lenght gater then two */}
              {
                pastDetailsData?.image?.length >= 2 && <div className=" p-2 flex gap-2">
                  <div className="flex flex-wrap gap-2">
                    {
                      pastDetailsData?.image.map((item, index) => {
                        return (
                          <div key={index} className="rounded-lg">
                            <img src={item} alt="" className="w-[251px] h-[200px] object-cover rounded-md" />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              }
            </div>


            {/* video */}
            <div className="w-full border rounded-md">
              {
                pastDetailsData?.video?.length > 0 && pastDetailsData?.video?.length < 2 && <div className="p-2 flex gap-2">
                  <div className="flex flex-wrap gap-2">
                    {
                      pastDetailsData?.video.map((vid, index) => {
                        return (
                          <div key={index} className="rounded-lg">
                            <video width="303" height="400" controls>
                              <source src={vid} type="video/mp4" />
                            </video>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              }

              {
                pastDetailsData?.video?.length >= 2 && <div className="p-2 flex gap-2">
                  <div className="flex flex-wrap gap-2">
                    {
                      pastDetailsData?.video.map((vid, index) => {
                        return (
                          <div key={index} className="rounded-lg">
                            <video width="303" height="400" controls>
                              <source src={vid} type="video/mp4" />
                            </video>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Assign Technician */}
          <Form.Item
            label="Assign Technician"
            name="technician"
          >
            <Input
              style={{ width: "100%", height: "44px" }}
              showSearch
              placeholder="Search technician"
              readOnly
            />
          </Form.Item>

          {/* Comment */}
          <Form.Item
            label="Comment"
            name="comment"
          // initialValue={detail?.user_comment}
          >
            <Input
              style={{ width: "100%", height: "44px" }}
              placeholder="Add your comment"
              readOnly
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Status"
            name="status"
          >
            <Input
              style={{ width: "100%", height: "44px" }}
              placeholder="New"
            />
          </Form.Item>
          {
            pastDetailsData?.location_employee_signature && <Form.Item
              label="Signature of location employee"
              name="location_employee_signature"
            >
              <Input
                style={{ width: "100%", height: "44px" }}
                placeholder="New"
              />
            </Form.Item>
          }

        </div>
        {/* Submit Button */}
      </Form>
    </div>
  )
}

export default SuperAdminPastInspectDetails