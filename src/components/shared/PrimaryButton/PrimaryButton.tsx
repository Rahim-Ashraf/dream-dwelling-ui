import { motion } from "framer-motion";

interface PropsTypes {
    btnText: string;
    BtnIcon?: React.ComponentType;
}

const PrimaryButton: React.FC<PropsTypes> = ({ btnText, BtnIcon }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <button className="px-8 py-4 rounded-lg bg-gradient-to-br from-teal-500 to-[#0060f0] text-white w-full flex gap-2 items-center justify-center">
                {btnText}{BtnIcon && <BtnIcon />}
            </button>
        </motion.div>
    );
};

export default PrimaryButton;