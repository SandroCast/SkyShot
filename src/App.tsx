import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { 
  Home, 
  Search, 
  PlusSquare, 
  MessageCircle, 
  User,
  MapPin,
  Star,
  Heart,
  Share2
} from 'lucide-react-native';
import { theme } from './theme';

const { width, height } = Dimensions.get('window');

// Mock Data
const DRONE_VIDEOS = [
  {
    id: '1',
    url: 'https://picsum.photos/seed/drone1/400/800',
    pilot: 'SkyHigh_Alex',
    location: 'Rio de Janeiro, BR',
    likes: '12.4k',
    description: 'Amanhecer no Cristo Redentor. #drone #aerial #rio',
  },
  {
    id: '2',
    url: 'https://picsum.photos/seed/drone2/400/800',
    pilot: 'AeroVisuals',
    location: 'SÃ£o Paulo, BR',
    likes: '8.2k',
    description: 'Selva de pedra vista de cima. #sp #dronephotography',
  }
];

const PILOTS = [
  {
    id: '1',
    name: 'Alex Silva',
    rating: 4.9,
    reviews: 128,
    specialty: 'Cinematografia',
    image: 'https://picsum.photos/seed/pilot1/100/100',
  },
  {
    id: '2',
    name: 'Beatriz Costa',
    rating: 4.8,
    reviews: 95,
    specialty: 'Mapeamento 3D',
    image: 'https://picsum.photos/seed/pilot2/100/100',
  }
];

const VideoFeed = () => (
  <ScrollView 
    pagingEnabled 
    showsVerticalScrollIndicator={false}
    style={styles.feed}
  >
    {DRONE_VIDEOS.map((video) => (
      <View key={video.id} style={styles.videoContainer}>
        <Image 
          source={{ uri: video.url }} 
          style={styles.videoPlaceholder} 
          resizeMode="cover"
        />
        <View style={styles.videoOverlay}>
          <View style={styles.videoInfo}>
            <Text style={styles.pilotName}>@{video.pilot}</Text>
            <Text style={styles.videoDescription}>{video.description}</Text>
            <View style={styles.locationTag}>
              <MapPin size={14} color={theme.colors.primary} />
              <Text style={styles.locationText}>{video.location}</Text>
            </View>
          </View>
          
          <View style={styles.sideActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={28} color="white" />
              <Text style={styles.actionText}>{video.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={28} color="white" />
              <Text style={styles.actionText}>42</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={28} color="white" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
);

const ExploreView = ({ onHire }: { onHire: (name: string) => void }) => (
  <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Encontre Pilotos</Text>
      <Text style={styles.headerSubtitle}>Profissionais qualificados perto de vocÃª</Text>
    </View>
    
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pilotos em Destaque</Text>
      {PILOTS.map((pilot) => (
        <TouchableOpacity key={pilot.id} style={styles.pilotCard}>
          <Image source={{ uri: pilot.image }} style={styles.pilotImage} />
          <View style={styles.pilotInfo}>
            <Text style={styles.pilotCardName}>{pilot.name}</Text>
            <Text style={styles.pilotSpecialty}>{pilot.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{pilot.rating} ({pilot.reviews} avaliaÃ§Ãµes)</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.hireButton}
            onPress={() => onHire(pilot.name)}
          >
            <Text style={styles.hireButtonText}>Contratar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [bookingPilot, setBookingPilot] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContainer}>
        {activeTab === 'home' ? (
          <VideoFeed />
        ) : (
          <ExploreView onHire={(name) => setBookingPilot(name)} />
        )}
        
        {bookingPilot && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Contratar {bookingPilot}</Text>
              <Text style={styles.modalText}>Deseja iniciar uma conversa com este piloto para solicitar um orÃ§amento?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.modalButtonSecondary}
                  onPress={() => setBookingPilot(null)}
                >
                  <Text style={styles.modalButtonTextSecondary}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButtonPrimary}
                  onPress={() => {
                    alert('SolicitaÃ§Ã£o enviada!');
                    setBookingPilot(null);
                  }}
                >
                  <Text style={styles.modalButtonTextPrimary}>Enviar Mensagem</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.navbar}>
          <TouchableOpacity 
            onPress={() => setActiveTab('home')}
            style={styles.navItem}
          >
            <Home size={24} color={activeTab === 'home' ? theme.colors.primary : theme.colors.textMuted} />
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Feed</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveTab('explore')}
            style={styles.navItem}
          >
            <Search size={24} color={activeTab === 'explore' ? theme.colors.primary : theme.colors.textMuted} />
            <Text style={[styles.navText, activeTab === 'explore' && styles.navTextActive]}>Explorar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItemCentral}>
            <View style={styles.plusButton}>
              <PlusSquare size={28} color="black" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <MessageCircle size={24} color={theme.colors.textMuted} />
            <Text style={styles.navText}>Mensagens</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <User size={24} color={theme.colors.textMuted} />
            <Text style={styles.navText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  feed: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width: width,
    height: height - 80, // Subtract navbar height
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  videoInfo: {
    flex: 1,
    marginBottom: theme.spacing.md,
  },
  pilotName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  videoDescription: {
    color: 'white',
    fontSize: 14,
    marginBottom: theme.spacing.sm,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: theme.colors.primary,
    fontSize: 12,
    marginLeft: 4,
  },
  sideActions: {
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  header: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  pilotCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  pilotImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  pilotInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  pilotCardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pilotSpecialty: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    marginLeft: 4,
  },
  hireButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  hireButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  navbar: {
    height: 80,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemCentral: {
    marginTop: -30,
  },
  plusButton: {
    width: 56,
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  navTextActive: {
    color: theme.colors.primary,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: theme.spacing.xl,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  modalText: {
    color: theme.colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  modalButtonPrimary: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.textMuted,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonTextPrimary: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalButtonTextSecondary: {
    color: theme.colors.textMuted,
    fontWeight: 'bold',
  }
});

