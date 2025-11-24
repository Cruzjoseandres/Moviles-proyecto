// EJEMPLO: Cómo usar la navegación en React Native
// ================================================

// 1. En cualquier componente, importa el hook de navegación:
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// 2. Define el tipo de navegación:
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// 3. Dentro de tu componente, usa el hook:
const navigation = useNavigation<NavigationProp>();

// 4. Navega entre pantallas:
navigation.navigate("Home"); // Ir a Home
navigation.navigate("Register"); // Ir a Register
navigation.goBack(); // Volver atrás

// EJEMPLO COMPLETO EN UN BOTÓN:
// ==============================
/*
<TouchableOpacity onPress={() => navigation.navigate('Register')}>
  <Text style={styles.footerText}>Registrarse</Text>
</TouchableOpacity>
*/

// DIFERENCIAS CON REACT WEB:
// ==========================
// ❌ Web (React Router):     const navigate = useNavigate(); navigate("/home");
// ✅ React Native:            const navigation = useNavigation(); navigation.navigate("Home");

// ❌ Web:                     <Link to="/register">Registro</Link>
// ✅ React Native:            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//                               <Text>Registro</Text>
//                             </TouchableOpacity>
