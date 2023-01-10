import { useRouter } from "next/router";

const PatientDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="m-10 p-5 bg-white shadow-sm rounded-sm">
      Patient detail: {id}
    </div>
  );
};

export default PatientDetailPage;
